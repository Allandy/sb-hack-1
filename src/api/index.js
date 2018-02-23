import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import axios from 'axios';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.post('/sms', (req, res) => {
		axios.post('https://rest.nexmo.com/sms/json', {
			api_key:"d095047f",
			api_secret:"ZZVCDSnIkl7fl7By",
			to:"61419570576",
			from:"Sportsbet",
			text:req.body.msg
		}).then(function (response) {
				console.log(response.statusText);
				res.json({ msg: 'good' });
			})
			.catch(function (error) {
				console.log(error);
			});
		
	});  

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}



