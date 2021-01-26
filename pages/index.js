import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {getProjectData} from '../data/Project Utils/projectData'
import React from 'react'

const util = require('util')

class Sidebar extends React.Component {
	render(){
		return(
			<div className={styles.sidebar}>
				{this.props.children}
			</div>
		)
	}
}

class ProjectScroller extends React.Component {
	render(){
		return(
			<div className={styles.projectScroller}>
				{this.props.children}
			</div>
		)
	}
}

class Section extends React.Component {
	render(){
		let content = [];
		for(let projectID in this.props.projects){
			const project = this.props.projects[projectID];
			content.push(<Project key={projectID} data={project} projectCallback={this.props.projectCallback}/>)
		}

		return(
			<>
				<h2>{this.props.title}</h2>
				{content}
      		</>
		)
	}
}

class Project extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		this.props.projectCallback(<ProjectContainer key={this.props.data.title} data={this.props.data}/>);

		return(
			<>
				<h3><a href={"#"+this.props.data.title}>{this.props.data.title}</a></h3>
				<Description>{this.props.data.description}</Description>
			</>
		)
  	}
}

class ProjectContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			content: null
		}

		this.containerRef = React.createRef();
	}

	componentDidMount(){
		if(this.props.data.source){
			import("../data/Projects/"+this.props.data.source).then((obj) => {
				let sceneManager = obj.default;
				this.setState({
					content:  sceneManager.components
				});
				sceneManager.setup(this.containerRef.current);
			});
		}	
	}

	render(){
		return(
			<div id={this.props.data.title} className={styles.projectContainer} ref={this.containerRef}>
				{this.state.content}
			</div>
		)
  	}
}

class Description extends React.Component {
	render(){
		return(
			<div className={styles.description}>
				<p>{this.props.children}</p>
			</div>
		)
	}
}


export default function Home({projectData}) {
	let projectContent = [];

	let projectCallback = (container) => {
		projectContent.push(container);
	}

	let sidebarContent = [];

	for(let groupID in projectData){
		const group = projectData[groupID];
		sidebarContent.push(<Section key={groupID} title={group.group} projects={group.projects} projectCallback={projectCallback}/>)
	}

  	return (
    	<>
			<Head>
				<title>Box of Things</title>
				<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet"></link>
			</Head>
			<Sidebar>
				{sidebarContent}
			</Sidebar>
			<ProjectScroller>
				{projectContent}
			</ProjectScroller>
    	</>
  	)
}

export async function getStaticProps() {
	var projectData = await getProjectData();
	console.log(util.inspect(projectData, false, null, true /* enable colors */))
	return {
		props: {
			projectData
		},
	}
}