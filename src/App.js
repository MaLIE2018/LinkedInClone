import Profile from './pages/Profile';
import { Container } from 'react-bootstrap';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import './css/App.css';
import Feed from './pages/Feed'
import React from "react"
import Search from './pages/Search'
import Ad from './components/Ad';
import { expsUrl, getExperiences, getProfiles } from './helper/fetchData';

import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login  from './components/Login.jsx';

const api = process.env.REACT_APP_BE_URL

const userId = localStorage.getItem("userId")
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didUpdate: false,
      posts:[],
      query: "",
      profile: {},
      currProfile:[],
      currProfileId: undefined,
      profiles: [],
      experiences:[],
      filteredPosts: [],
      filteredPeople:[],
    };
  
  }
  // 609a5eb3dfccc50015a6bbba Ankit
  // Hasib eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk4ZmE0MTYxOWU1ZDAwMTUxZjhmN2YiLCJpYXQiOjE2MjA2MzgyNzMsImV4cCI6MTYyMTg0Nzg3M30.D-RniP4L8eJ8XOdOjRXswq8LsRnPVK-QYiUr8h9fPhk

  // filterPeople = () => {
  //   let query = this.state.query
  //   let filteredPeople = this.state.profiles.filter(p => {
  //     if (p.name.toLowerCase().includes(query.toLowerCase()) || p.surname.toLowerCase().includes(query.toLowerCase())) {
  //       return true}
  //   })

  //   this.setState((state) => {
  //     return {
  //       filteredPeople: filteredPeople
  //     }
  //   })
  // }

  // filterPosts = () => {
  //   let query = this.state.query
  //   let filteredPosts = this.state.posts.filter(p => {
  //     if (p.text.toLowerCase().includes(query.toLowerCase()) ) {
  //       return true}
  //   })

  //   this.setState((state) => {
  //     return {
  //       filteredPosts: filteredPosts
  //     }
  //   })
  // }

  getProfile = async () => {
    try {
      const res = await fetch(api +"api/profile/" + this.state.currProfileId);
      console.log("Test")
      if (res.ok) {
        this.setState({ currProfile: await res.json(), didUpdate: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getMyProfile = async () => {
    try {
      const res = await fetch(api +"api/profile/" + userId);
      console.log("Test")
      if (res.ok) {
        this.setState({ profile: await res.json(), didUpdate: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.setState({currProfileId: this.props.location.pathname.match(/\d+/)})
    this.getProfile()
    this.getMyProfile()
    // let profiles = await getProfiles(this.state.bearerToken)
    // this.setState((state) => {return { 
    //   profiles: profiles
    // }})
    // let exps = await getExperiences(this.state.bearerToken, expsUrl)
    // this.setState((state) => {return { 
    //   experiences: exps
    // }})
  }
  componentDidUpdate(prevProps, prevState){
    if (this.state.didUpdate !== prevState.didUpdate){
      this.getProfile()
      this.getMyProfile()
    }
    if(prevState.currProfileId !== this.state.currProfileId){
      this.getProfile()
    }
    if(prevState.query !== this.state.query){
      this.filterPeople()
      this.filterPosts()
    }
    if(this.props.location.pathname !== prevProps.location.pathname){
      this.getProfile()
      this.getMyProfile()
    }
  }

  handleUpdate = () => {
    this.setState((state) => {
      return { didUpdate: true };
    });
  };
  handleChangeQuery = (e) => {
      e.preventDefault();
      this.setState((state) => {
        return { query: e.target.value,}
          
      })
  }
  handleCurrProfileChange = (currProfileId) => {
    console.log('currProfileId:', currProfileId)
    console.log("handled")
      this.setState((state) => {
        return { currProfileId: currProfileId,}
      })
  }
	render(){ 
  // localStorage.setItem('userId',2)
  if(localStorage.getItem('userId')){

    return (
      <>
        <MyNavbar name={this.state.profile.name} 
        image={this.state.profile.image}
        query={this.state.query}
        userId={localStorage.getItem('userId')}	
        onChangeQuery={this.handleChangeQuery}/>
        <Container sm="fluid" style={{marginTop: "8vh"}} className="pt-2" >
          {(this.state.query.length === 0 )&& <Ad title="Need Developers ASAP? Hire the top 3% of 
          developers in 48 hours. $0
            Recruiting fee. Start now."/>}
          <Route render={(routerProps) => <Profile
                        profile={this.state.currProfile}
                        onDidUpdate={this.handleUpdate}
                        currProfileId={this.state.currProfileId}
                        onCurrProfileChange={this.handleCurrProfileChange}
                      />} path={["/profile/:id"]}/>
          <Route render={(routerProps) => <Login routerProps={routerProps} />} exact path={"/login"}/>
          <Route render={(routerProps) => <Feed profile={this.state.profile}/>} exact path={["/feed", "/"]}/>
          <Route render={(routerProps) => <Search
                        profiles = {this.state.filteredPeople.length !== 0?
                          this.state.filteredPeople
                          :
                          this.state.profiles}
                          posts={this.state.filteredPosts.length !== 0?
                            this.state.filteredPosts
                            :
                            this.state.posts}
                            bearerToken={this.state.bearerToken}
                            />} exact path={["/Search/q=:query","/search/q=:query/:filter"]}/>
        <Footer/>
        </Container>
    </>
    );
  }else{
    
    return (
     <Container sm="fluid" style={{marginTop: "8vh"}} className="pt-2" >
   <MyNavbar name={this.state.profile.name} 
        image={this.state.profile.image}
        query={this.state.query}
        userId={localStorage.getItem('userId')}	
        onChangeQuery={this.handleChangeQuery}/>
         <Route render={(routerProps) => <Login rout erProps={routerProps} />} exact path={"/login"}/>
         <Footer/>
         <Redirect to="/login" />
        </Container>)
  }
}
}

export default withRouter(App);
