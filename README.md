# React Firebase UI

## Demo
See at [link](https://react-firebase-web-auth-demo.firebaseapp.com/)

## Usage
```
npm i react-firebase-web-auth
```

## Development
* Build dist and use local example
```
rm -rf example/src/components/ && cp -R src/ example/src/components/
```

* In root dir
```
npm run patch && npm run build && cd dist/ && npm run publisher
```

* In `dist/` dir
```
cd ../ && npm run patch && npm run build && cd dist/ && npm run publisher
```

## License & Credit
Publish under MIT license by [ngthuc](https://ngthuc.com)
