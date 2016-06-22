# FENIX Dashboard

```javascript
var Dashboard = require('fx-dashboard/start');

var dashboard = new Dashboard({
        uid : "FENIX_resource_uid",
        items : [
            { 
            id : "chart-1",
             /* item configuration goes here */ 
            }, 
            { ... }
        ]
    });
```

```html
<div data-item='chart-1'></div>
```

# Configuration

To have a look of the default configuration check `fx-dashboard/config/config.js`.

<table>
   <thead>
      <tr>
         <th>Parameter</th>
         <th>Type</th>
         <th>Default Value</th>
         <th>Example</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>uid</td>
         <td>string</td>
         <td>-</td>
         <td>"UNECA_Education"</td>
         <td>FENIX resource uid to use to build the dashboard</td>
      </tr>
      <tr>
         <td>version</td>
         <td>string</td>
         <td>-</td>
         <td>1.0</td>
         <td>FENIX resource version to use to build the dashboard</td>
      </tr>
      <tr>
         <td>el</td>
         <td>CSS3 Selector/JavaScript DOM element/jQuery DOM element</td>
         <td> - </td>
         <td>"#container"</td>
         <td>Optional component container. if specified items's will be searched within it otherwise within the whole document.</td>
      </tr>
      <tr>
         <td>items</td>
         <td>Object</td>
         <td> - </td>
         <td> - </td>
         <td>The dashboard's visualization items to render. Check the Item configuration. </td>
      </tr>
      <tr>
         <td>environment</td>
         <td>string</td>
         <td>'develop'</td>
         <td>'production'</td>
         <td>Server environment</td>
      </tr>
      <tr>
         <td>preProcess</td>
         <td>FENIX resource process</td>
         <td>-</td>
         <td>-</td>
         <td>Common initial process to be applied to each dashboard item. Check Process composition flow for more details</td>
      </tr>
      <tr>
         <td>postProcess</td>
         <td>FENIX resource process</td>
         <td>-</td>
         <td>-</td>
         <td>Common final process to be applied to each dashboard item. Check Process composition flow for more details</td>
      </tr>
      <tr>
         <td>filter</td>
         <td>FENIX filter plain format. Keys are resource dimensions' id, values are array containing the values to include</td>
         <td>-</td>
         <td>{
            year : ["2002", "2003"],
            product : ["cod_1", "code_2"]
            }
         </td>
         <td>Common filter values to be applied to each dashboard item. Check Process composition flow for more details</td>
      </tr>
      <tr>
         <td>cache</td>
         <td>boolean</td>
         <td>false</td>
         <td>true</td>
         <td>whether or not to use FENIX bridge cache</td>
      </tr>
      <tr>
         <td>itemsRegistry</td>
         <td>object</td>
         <td>{
            'chart': {
            path: selectorPath + 'chart'
            },
            'map': {
            path: selectorPath + 'map'
            },
            'olap': {
            path: selectorPath + 'olap'
            }
            }
         </td>
         <td>-</td>
         <td>Keyset: plugins' ids. Value: object. path: plugin module path</td>
      </tr>
   </tbody>
</table>

# Item configuration

<table>
   <thead>
      <tr>
         <th>Parameter</th>
         <th>Type</th>
         <th>Default Value</th>
         <th>Example</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>id</td>
         <td>string</td>
         <td>-</td>
         <td>"chart-1"</td>
         <td>Specifies the visualization item id and its container. The param is used to search for the HTML with the `data-item=:id` 
            attribute within the dashboard `el`. If no `el` is specified the whole document is considered
         </td>
      </tr>
      <tr>
         <td>type</td>
         <td>string</td>
         <td>-</td>
         <td>chart || map || table || box</td>
         <td>The visualization item type. For native plugin, rendering process will be proxied to FENIX chart, table, 
            map creators or to FENIX Visualization box accordingly. In case custom plugin are used, specify here the plugin id
         </td>
      </tr>
      <tr>
         <td>config</td>
         <td>object</td>
         <td>-</td>
         <td>-</td>
         <td>Configuration proxied to visualization component. Its content is linked to the item `type` configuration. Check FENIX creators documentation
            for configuration details. (e.g. if `item.type="chart"` than `config` is the FENIX chart creator config)
         </td>
      </tr>
      <tr>
         <td>preProcess</td>
         <td>FENIX resource process</td>
         <td>-</td>
         <td>-</td>
         <td>Initial process to be applied to item. Check Process composition flow for more details</td>
      </tr>
      <tr>
         <td>postProcess</td>
         <td>FENIX resource process</td>
         <td>-</td>
         <td>-</td>
         <td>Final process to be applied to item. Check Process composition flow for more details</td>
      </tr>
      <tr>
         <td>filter</td>
         <td>FENIX filter plain format. Keys are resource dimensions' id, values are array containing the values to include</td>
         <td>-</td>
         <td>{
            year : ["2002", "2003"],
            product : ["cod_1", "code_2"]
            }
         </td>
         <td>Filter values to be applied to item. Check Process composition flow for more details</td>
      </tr>
      <tr>
         <td>filterFor</td>
         <td>Array of dimensions' id || object: keys are step process rid, values are Array of dimensions' ids</td>
         <td>-</td>
         <td>["year"]
         </td>
         <td>Used to define what filter values should be applied to the item process. Check Process composition flow</td>
      </tr>
   </tbody>
</table>

# API

```javascript
//This is an example
dashboard.refresh({...});
```

- `dashboard.refresh( values )` : refresh dashboard items with new filter values (FENIX filter plain format)
- `dashboard.on(event, callback[, context])` : pub/sub 
- `dashboard.dispose()` : dispose the dashboard instance

# Events

- `ready` : triggered when the dashboard and all its items are rendered

# Process composition flow 

FENIX dashboard composes dynamically the FENIX process to be use to retrieve the data for each dashboard item.
The FENIX process composition is based on the nature (`typeof`) of `item.filterFor`: if it is defined as array or as object.

## `item.filterFor` as array

+ `dashboard.preProcess`
+ `item.preProcess`
+ calculated filter step from `item.filter` and `item.filterFor`
+ `item.postProcess`
+ `dashboard.postProcess`

## `item.filterFor` as object

+ `dashboard.preProcess`
+ `item.preProcess`
+ `item.postProcess`
+ `dashboard.postProcess`

`item.filter` is now applied as following: given `item.filterFor` as object, its key set represents the set of step 
to consider for filtering. Each key of the key set represents in fact a step rid (i.e. the identification of a step). 
The array relative to each key is used to calculate a FENIX process filter step that will extend the original step.

### Example

```javascript

...

filterFor : {
        step_1 : ["year"],
        step_2 : ["indicator"]
    },
preProcess : [
    { 
        rid : "step_1",
        ...
    },
    { 
        rid : "step_2",
        ...
    }
    ],
...


```

In the previous example the filter for will be applied to `step_1` ( for `year` values) and to `step_2` ( for `indicator` values).