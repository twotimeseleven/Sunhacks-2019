import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import Results from "../models/Results.js"


const industries = [
  {
    name: "Engineering",
    jobs: ["Software Engineering", "Chemical Engineering", "Mechanical Engineering"]
  },
  {
    name: "Business",
    jobs: ["Sales", "Manager", "Accounting"]
  },
  {
    name: "Science",
    jobs: ["Physics", "Chemistry", "Biology"]
  },
  {
    name: "Healthcare",
    jobs: ["Nurse", "Doctor", "Administration"]
  },
  {
    name: "Education",
    jobs: ["Teacher", "Admin", "Faculty"]
  }
]

export default class Job extends Component {
    constructor(props){
      super(props)
      this.state = {
        showJobs: false,
        jobs: [],
        industry: ""
      }
    }

    goBack(){
      this.setState({
        showJobs: !this.state.showJobs,
        jobs: []
      })
    }

    handleSelect(e) {
      console.log(typeof(e.target.value))
      console.log(e.target.value)
      this.setState({
        showJobs: true,
        jobs: e.target.value.split(","),
        job: ""
      })
    }

    handleSubmit = (e) => {
      if (this.state.job !== "") {
        console.log(this.state.job)
        Results.updateJob("job", this.state.job)
        this.props.goForward()    
      }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })


    selectJob(e) {
      console.log(e.target.value)
      Results.updateJob("job", e.target.value)
      this.props.goForward()
    }

    render() {
      return (
        <div style={{textAlign: "center"}}>
        {
          this.state.showJobs?
          <div>
            <h1> What type of positions are you looking for? </h1>
            <div style={{margin: 10}}>
              {this.state.jobs.map((job, index) =>
                  <Button
                    key={index}
                    value={job}
                    onClick={this.selectJob.bind(this)}>{job}</Button>
                )}
              </div>
            <div style={{margin: 10}}>
              <Button onClick={this.goBack.bind(this)}> Go Back</Button>
            </div>
          </div> :
          <div style={{margin: 10}}>
          <div>
          <h1> What industry would you like to work in? </h1>
            {industries.map((industry, index) =>
                <Button
                  key={index}
                  name={industry.name}
                  value={industry.jobs}
                  onClick={this.handleSelect.bind(this)}>{industry.name}</Button>
              )}
          </div>
          </div>
        }
        <p> Interested in something else? No problem!</p>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Input
            onChange={this.handleChange.bind(this)}
            name="job"
            placeholder = "Underwater Basket Weaving"
          />
        </Form>

        </div>
      )

    }

}
