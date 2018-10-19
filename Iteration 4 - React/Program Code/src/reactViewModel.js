aTable.push(
  <tr key={aTable.length}>
    <td>Correlation:</td>
    <td>{viewModel.state.correlation}</td>
  </tr>
)
aTable.push(
  <tr key={aTable.length}>
    <td>Coefficient of Determination:</td>
    <td>{viewModel.state.coefficientOfDetermination}</td>
  </tr>
)
aTable.push(
  <tr key={aTable.length}>
    <td>X&beta;0:</td>
    <td>{viewModel.state.beta0X}</td>
  </tr>
)
aTable.push(
  <tr key={aTable.length}>
    <td>X&beta;1:</td>
    <td>{viewModel.state.beta1X}</td>
  </tr>
)
aTable.push(
  <tr key={aTable.length}>
    <td>Y&beta;0:</td>
    <td>{viewModel.state.beta0Y}</td>
  </tr>
)
aTable.push(
  <tr key={aTable.length}>
    <td>Y&beta;1:</td>
    <td>{viewModel.state.beta1Y}</td>
  </tr>
)
