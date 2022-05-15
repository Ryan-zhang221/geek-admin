import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props) {
    let title = ref('')    
    let todos = ref([{
      title: 'learn',
      done: true
    }])

    function addTodo() {
      todos.value.push({
        title: title.value,
        done: false
      })
      title.value = ''
    }

    return () => <div>
      <input type="text" vModel={title.value}></input>
      <button onClick={addTodo}>添加</button>
      <ul>
        {
          todos.value.length ? todos.value.map(todo =>  {
            return <li>{todo.title}</li>
          }) : <li>no data</li>
        }
      </ul>
    </div>    
  }
})