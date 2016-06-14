# FENIX Dashboard

# Configuration

```javascript
var dashboard = new Dashboard(options);
```

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
                          }</td>
          <td>-</td>
          <td>Keyset: plugins' ids. Value: object. path: plugin module path</td>
        </tr>

  </tbody>
</table>

# API
