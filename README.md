# React Firebase UI

## Usage
```
npm i @ngthuc/react-fui
```

## Development
* Build dist and use local
```
npm run build && rm -rf example/node_modules/@ngthuc/react-fui && cp -v -a dist/ example/node_modules/@ngthuc/react-fui
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
