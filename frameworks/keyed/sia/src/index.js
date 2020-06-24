import s from '../node_modules/sia/browser/sia.js'

const { state, actions } = Model()

const buttons = [
  { id: 'run', onclick: actions.run, label: 'Create 1,000 rows' },
  { id: 'runlots', onclick: actions.runLots, label: 'Create 10,000 rows' },
  { id: 'add', onclick: actions.add, label: 'Append 1,000 rows' },
  { id: 'update', onclick: actions.update, label: 'Update every 10th row' },
  { id: 'clear', onclick: actions.clear, label: 'Clear' },
  { id: 'swaprows', onclick: actions.swapRows, label: 'Swap Rows' }
]

const button = s(({ id, onclick, label }) =>
  s`.col-sm-6.smallpad`(
    s`button.btn.btn-primary.btn-block`({
      type: 'button',
      id,
      onclick
    }, label)
  )
)

const row = s(({ id, label, selected }) =>
  s`tr`({
    class: state.selected === id && 'danger'
  },
    s`td.col-md-1`(
      id
    ),
    s`td.col-md-4`(
      s`a.lbl`({
        onclick: () => actions.select(id)
      }, label)
    ),
    s`td.col-md-1`(
      s`a.remove`({
        onclick: () => actions.remove(id)
      },
        s`span.remove.glyphicon.glyphicon-remove`({
          'aria-hidden': 'true'
        })
      )
    ),
    s`td.col-md-6`()
  )
)

s.mount(document.getElementById('main'), () =>
  s`.container`(
    s`.jumbotron`(
      s`.row`(
        s`.col-md-6`(
          s`h1`('Sia-"keyed"')
        ),
        s`.col-md-6`(
          s`.row`(
            buttons.map(button)
          )
        )
      )
    ),
    s`table.table.table-hover.table-striped.test-data`(
      s`tbody`({
        id: 'tbody'
      },
        state.data.map(x => row({ key: x.id, ...x }))
      )
    )
  )
)

function Model() {
  let id = 1
  const _random = (max) => Math.round(Math.random() * 1000) % max

  const state = {
    selected : undefined,
    data : []
  }

  const actions = {
    remove(id) {
      const idx = state.data.findIndex(d => d.id === id)
      state.data.splice(idx, 1)
    },
    buildData(count = 1000) {
      const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy']
      const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
      const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard']
      const data = []
      for (let i = 0; i < count; i++)
        data.push({ id: id++, label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)] })
      return data
    },
    run() {
      state.data = actions.buildData()
      state.selected = undefined
    },
    update(mod = 10) {
      for (let i = 0; i < state.data.length; i += 10)
        state.data[i].label += ' !!!'
    },
    add() {
      state.data = [].concat(state.data, actions.buildData(1000))
    },
    select(id) {
      state.selected = id
    },
    runLots() {
      state.data = actions.buildData(10000)
      state.selected = undefined
    },
    clear() {
      state.data = []
      state.selected = undefined
    },
    swapRows() {
      if (state.data.length > 998) {
        const a = state.data[1]
        state.data[1] = state.data[998]
        state.data[998] = a
      }
    }
  }

  return { state, actions }
}
