# Test project installation

1: Clone project
 
```sh
cd /my/path/test-work
git clone https://github.com/artesx/test-project.git .
```
2: Install Docker and docker-compose https://docs.docker.com/install/ https://docs.docker.com/compose/install/

3: Create a .env file and copy the contents of the .env.example file into it, back and front

```sh
cd test-work-back
touch .env
cat .env.example > .env

cd ../test-work-front
touch .env
cat .env.example > .env
```

#### Launch Test project

For production

```sh
cd /my/path/test-work
sh MakefileProd
```

For development

```sh
cd /my/path/test-work
sh MakefileDev
```

By default, the application will run on port 12000
