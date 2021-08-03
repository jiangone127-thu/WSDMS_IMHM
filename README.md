# WSDMS_IMHM
A Web Service-based Disaster Management System for Integrated Multi-hazard Modeling

# system demo
./demo/ shows how the system works

# system configuration #

## step-1 configs npmrc of node
position C:\Program Files\nodejs\node_modules\npm
THEN modify npmrc
prefix=${APPDATA}\npm
chromedriver_skip_download=true

## step-2 Project setup
```
npm install
```

## step-3 Compiles and hot-reloads for development
```
npm run serve
```

## step-4 Compiles and minifies for production
```
npm run build
```

## step-5 Run your tests
```
npm run test
```

## step-6 Lints and fixes files
```
npm run lint
```

## step-7 Run your end-to-end tests
```
npm run test:e2e
```

## step-8 Run your unit tests
```
npm run test:unit
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Catalogue specification

## Component development

@Component({
    // name
    name : 'component name',
    // depends
    components: {
        
    }
    // other
})
export default class extends Vue {
    @Prop private name! = string  
    private name = 'abc'
    @provide
    @model
    @Watch
    @Inject
    @Provide
    @Emit  
    get function 
    set function 
    // Life Cycle Sequence 
    creted(){

    }
    // method       
    private function

}
