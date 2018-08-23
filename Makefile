build: 
	docker build -t nosduco/xtendhue .

node: 
	yarn start

start: 
	docker run -p 8080:3000 -d --name xtendhue nosduco/xtendhue

stop:
	docker stop xtendhue
	docker rm xtendhue
