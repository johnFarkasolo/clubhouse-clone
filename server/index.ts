import express from 'express';
import dotenv from 'dotenv';
import multer from "multer";

dotenv.config({
	path: 'server/.env'
});

import './core/db'

import { passport } from './core/passport';

const app = express();

app.use(passport.initialize());

app.get('/auth/github', passport.authenticate('github'));

app.get('/upload', multer.single('upload'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
		try {
			// res.json(req.user);
			res.send(`<script>window.opener.postMessage('${JSON.stringify(req.user)}', '*');window.close();</script>`)
		} catch (error) {
			console.error(error)
		}
    });

app.get('/test', (req, res) => {
    res.send('HEllo!');
})
app.listen(3001, () => {
    console.log("server runned")
});
