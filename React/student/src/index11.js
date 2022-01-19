import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//working with lists in react

const posts = [
  {id:101,title:"First Post",content:"This is content from first post."},
  {id:102,title:"Second Post",content:"This is content from second post."}
]

//you should always have key while working with list items otherwise error in production strict mode
function Blog(props){
  const sideBar = (
    <ul>
      {props.posts.map(
        (post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map(
    (post) =>
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>      
  );

  return(
    <div>
      {sideBar}
      <hr />
      {content}
    </div>
  );
}

ReactDOM.render(  
  <Blog posts={posts}/> ,
document.getElementById('root')
);