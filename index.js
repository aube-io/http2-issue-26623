const http2   = require('http2');
const https   = require('https');
const fs 	  = require('fs');

const options = {
	key  : fs.readFileSync(__dirname + '/localhost.key.pem'),
	cert : fs.readFileSync(__dirname + '/localhost.cert.pem')
};

http2.createSecureServer(options,(req,res) => {
	if (req.method === 'POST') {

		req.on('data', () => {});
		res.stream.end('ok');

	} else if (req.method === 'GET') {

		res.stream.end(`
			<html>
				<head></head>
				<body>
					<form method="POST">
						<input type="file" name="textfield" multiple>
						<input type="submit">
					</form>
					<script type="text/javascript" defer>
						let $form = document.querySelector('form');
						if ($form){
							$form.addEventListener('submit', e => {
								e.preventDefault();
								fetch('https://localhost:1337/',{
									mode:'no-cors',
									method:'POST',
									body:new FormData($form)
								})
							});
						}
					</script>
				</body>
			</html>
		`);

	}
}).listen(1337);

https.createServer(options,(req,res) => {
	if (req.method === 'POST') {

		req.on('data', () => {});
		res.end('ok');

	} else if (req.method === 'GET') {

		res.end(`
			<html>
				<head></head>
				<body>
					<form method="POST">
						<input type="file" name="textfield" multiple>
						<input type="submit">
					</form>
					<script type="text/javascript" defer>
						let $form = document.querySelector('form');
						if ($form){
							$form.addEventListener('submit', e => {
								e.preventDefault();
								fetch('https://localhost:1338/',{
									mode:'no-cors',
									method:'POST',
									body:new FormData($form)
								})
							});
						}
					</script>
				</body>
			</html>
		`);

	}
}).listen(1338);