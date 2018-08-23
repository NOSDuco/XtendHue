build: 
	docker build -t nosduco/huecontrol .

node: 
	npm start

start: 
	docker run -p 8080:3000 -d --name huecontrol nosduco/huecontrol

stop:
	docker stop huecontrol
	docker rm huecontrol
