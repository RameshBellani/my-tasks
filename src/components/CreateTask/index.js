import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreateTask extends Component {
  state = {
    searchInput: '',
    inputTags: tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTags: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {searchInput, inputTags} = this.state
    const newTask = {
      id: uuidv4(),
      task: searchInput,
      tag: inputTags,
    }
    if (searchInput !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        searchInput: '',
        inputTags: '',
      }))
    }
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTaskView = () => {
    const {searchInput, inputTags} = this.state
    return (
      <div className="task-Container">
        <form className="form" onSubmit={this.submitForm}>
          <h1 className="headingform">Create a task!</h1>
          <div className="lable-container">
            <label className="label" htmlFor="input">
              Task
            </label>
            <input
              type="text"
              value={searchInput}
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
              id="input"
              className="input"
            />
          </div>
          <div className="lable-container">
            <label className="label" htmlFor="tag">
              Tags
            </label>
            <select
              className="select"
              value={inputTags}
              onChange={this.onChangeTag}
              id="tag"
            >
              {tagsList.map(each => (
                <option
                  className="option"
                  value={each.optionId}
                  key={each.optionId}
                >
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button className="taskbutton" type="submit">
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderTaskView = () => {
    const {taskList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <li className="task-list-li" key={each.id}>
            <p className="task">{each.task}</p>
            <p className="tag">{each.tag}</p>
          </li>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {taskList, activeTag} = this.state
    return (
      <div className="add-container">
        <h1 className="heading">Tags</h1>
        <ul className="tagul">
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId ? 'open' : 'colse'
            return (
              <li className="taglist" key={each.optionId}>
                <button
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  className={isActive}
                >
                  {each.displayText}
                </button>
              </li>
            )
          })}
        </ul>
        <h1 className="heading">Tasks</h1>
        <ul className="taskul">
          {taskList.length === 0 ? (
            <p className="no-task">No Tasks Added Yet</p>
          ) : (
            this.renderTaskView()
          )}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </div>
    )
  }
}

export default CreateTask
