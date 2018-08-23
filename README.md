# ng-Momentum
Momentum is an Angular Schematic developed by the Bottle Rocket Web Team to build best-in-class web applications faster.

## Getting Started
For the initial scaffolding (required before anything else cause it sets everything where it needs to be).
```bash
cd to/wherever/you/are/putting/your/project
ng new my-momentum-project
cd my-momentum-project/
ng add ng-momentum
```
If you want to include PWA features we recommend then running the next line.
```bash
ng add @angular/pwa
```
Extra details below about each option.

## Helpful Commands
To run the fun try these commands in your project.

### Scaffold
For the initial scaffolding (required before anything else cause it sets everything where it needs to be).
```bash
ng g ng-momentum:scaffold --spec=false --force
```

Detailed description of options.

| Option | Type | Description | Enums | Default |
| ------ | ---- | ----------- | ----- | ------- |
| --spec | boolean | Do you want to have the tests generated for you? | true, false | true |
| --skipScripts | boolean | Do you want to have the additional (helpful) package scripts added for you? | true, false | true |
| --includePwa | boolean | Include PWA features? | true, false | true |
| --uiFramework | string | Which ui framework are you intending to use? This sets the default for future view templates. | material, bootstrap, basic | material |

### VO
For building a value object. You may want to do this, or let the other generators create objects as they see necessary and then your can just reference your value objects. Whatever, it's your application.

```bash
ng g ng-momentum:vo --name=shoes --obj="{\"laces\":\"boolean\", \"color\":\"string\", \"size\":\"number\"}"
```

Detailed description of options.

| Option | Type | Description | Enums | Default |
| ------ | ---- | ----------- | ----- | ------- |
| --project | string | The name of the project. | | default project |
| --path | string | The path to create the vo within the vos/ folder. | | (none) |
| --name | string | Specifies the name of the value object. | | (first argument) |
| --obj | string | Object string for the value object. (in JSON.stringify format). | | {\"id\":\"number\", \"title\":\"string\"} |
| --flat | boolean | Flag to indicate if a dir is created. | true, false | false |
| --spec | boolean | Specifies if a spec file is generated. | true, false | true |


### View
This builds a view for you with the ui framework you previously set. You have a lot of options and this should he you get right to the important coding faster.

```bash
ng g ng-momentum:view --name=my_view --template=blank
```

Detailed description of options.

| Option | Type | Description | Enums | Default |
| ------ | ---- | ----------- | ----- | ------- |
| --project | string | The name of the project. | | default project |
| --path | string | The path to create the view within the views/ folder. | | (none) |
| --name | string | Specifies the name of the value object. | | (first argument) |
| --obj | string | Object string for the value object. (in JSON.stringify format). | | {\"id\":\"number\", \"title\":\"string\"} |
| --flat | boolean | Flag to indicate if a dir is created. | true, false | false |
| --spec | boolean | Specifies if a spec file is generated. | true, false | true |
| --eager | boolean | Flag to determine if the view should be eager loaded vs lazy loaded. | true, false | false |
| --uiFramework | string | Which ui framework are you intending to use? This sets the default for future view templates. | material, bootstrap, basic | material |
| --vo | string | Specifies the vo to be created with this object. Overrides the default naming. | | (none) |
| --voPath | string | Specifies the vo path. | | (none) |
| --skipVo | boolean | Specifies if we should skip generating vo files. | true, false | false |
| --service | string | Specifies the service to be created with this object. Overrides the default naming. | | (none) |
| --servicePath | string | Specifies the service path. | | (none) |
| --skipService | boolean | Specifies if we should skip generating service files. | true, false | false |
| --template | string | Specifies template to create. | blank, form, table, list, details | blank |

### Service
This builds a service for you to help you make calls to outside locations.

```bash
ng g ng-momentum:svc --name=your-service

```

Detailed description of options.

| Option | Type | Description | Enums | Default |
| ------ | ---- | ----------- | ----- | ------- |
| --project | string | The name of the project. | | default project |
| --path | string | The path to create the service within the service/ folder. | | (none) |
| --name | string | Specifies the name of the value object. | | (first argument) |
| --obj | string | Object string for the value object. (in JSON.stringify format). | | {\"id\":\"number\", \"title\":\"string\"} |
| --flat | boolean | Flag to indicate if a dir is created. | true, false | false |
| --spec | boolean | Specifies if a spec file is generated. | true, false | true |
| --vo | string | Specifies the vo to be created with this object. Overrides the default naming. | | (none) |
| --voPath | string | Specifies the vo path. | | (none) |
| --uri | string | Specifies the service uri to hit. | | (none) |
| --endpoint | string | Specifies the service endpoint to hit. | | (none) |
| --operations | string | Specifies the service strategy (clrud). | | clrud |

### Model
This builds either a basic model, a list model, or a 'selected object' model for you. Selected object models can load the model, create/update/save, and delete. Models are helpful if you have multiple components that are disconnected but need to share data/state. This can also be used to cache your data and have more control. You may not find them helpful at all though. So it is up to you.

```bash
ng g ng-momentum:model --name=heros --template=list
```

Detailed description of options.

| Option | Type | Description | Enums | Default |
| ------ | ---- | ----------- | ----- | ------- |
| --project | string | The name of the project. | | default project |
| --path | string | The path to create the model within the models/ folder. | | (none) |
| --name | string | Specifies the name of the value object. | | (first argument) |
| --obj | string | Object string for the value object. (in JSON.stringify format). | | {\"id\":\"number\", \"title\":\"string\"} |
| --flat | boolean | Flag to indicate if a dir is created. | true, false | false |
| --spec | boolean | Specifies if a spec file is generated. | true, false | true |
| --vo | string | Specifies the vo to be created with this object. Overrides the default naming. | | (none) |
| --voPath | string | Specifies the vo path. | | (none) |
| --skipVo | boolean | Specifies if we should skip generating vo files. | true, false | false |
| --service | string | Specifies the service to be created with this object. Overrides the default naming. | | (none) |
| --servicePath | string | Specifies the service path. | | (none) |
| --skipService | boolean | Specifies if we should skip generating service files. | true, false | false |
| --template | string | Model type for template specification. | blank, list, selected | blank |

### CRUD
This is the big one. You can just point this to an endpoint or state the object structure and it creates a full CRUD operation against your endpoint create for consumption. It's really cool.

```bash
ng g ng-momentum:crud --name=heros --url=http://localhost:3000/superheros.json
```

Detailed description of options.

| Option | Type | Description | Enums | Default |
| ------ | ---- | ----------- | ----- | ------- |
| --project | string | The name of the project. | | default project |
| --path | string | The path to create the view within the views/ folder. | | (none) |
| --name | string | Specifies the name of the value object. | | (first argument) |
| --obj | string | Object string for the value object. (in JSON.stringify format). | | {\"id\":\"number\", \"title\":\"string\"} |
| --flat | boolean | Flag to indicate if a dir is created. | true, false | false |
| --spec | boolean | Specifies if a spec file is generated. | true, false | true |
| --vo | string | Specifies the vo to be created with this object. Overrides the default naming. | | (none) |
| --voPath | string | Specifies the vo path. | | (none) |
| --skipVo | boolean | Specifies if we should skip generating vo files. | true, false | false |
| --service | string | Specifies the service to be created with this object. Overrides the default naming. | | (none) |
| --servicePath | string | Specifies the service path. | | (none) |
| --skipService | boolean | Specifies if we should skip generating service files. | true, false | false |
| --eager | boolean | Flag to determine if the view should be eager loaded vs lazy loaded. | true, false | false |
| --uiFramework | string | Which ui framework are you intending to use? This sets the default for future view templates. | material, bootstrap, basic | material |
| --url | string | Url to get object parameters. |  | (none) |
| --skipImport | boolean | Flag to skip the module import. | true, false | false |
| --export | boolean | Specifies if declaring module exports the directive. | true, false | false |
| --view | string | Specifies the view to be created with this object. Overrides the default naming. |  | (none) |
| --viewPath | string | Specifies the view path. |  | (none) |
| --skipView | boolean | Specifies if we should skip generating view files. | true, false | false |

## Important Notes

### Required updates
To fix the material issue
https://github.com/angular/material2/pull/12028/commits/735c15b539671a4651aa75fc432b13b3499509a9

### Yarn vs NPM
I've noticed that when using `npm install` there seems to be conflicts around `@angular/core`. These
conflicts do not exist when using `yarn`. I would recommend using `yarn` vs `npm install`. By default
schematics calls `npm install` initially. I just have been deleting the `/node_modules` folder
and running `yarn` for a successful first build.

### Todo
 
List of TODO items that are outstanding.

- `view` - add e2e tests
- `crud` - add e2e tests

# Development

### Testing

To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!