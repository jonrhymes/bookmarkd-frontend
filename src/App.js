import React from 'react';
import './App.css';
import './css/style.scss'
import Form from './form.js'

const App = (props) => {
  // Create State
  const [bookmarks, setBookmarks] = React.useState(null);
  const [editingBookmarkId, setEditingBookmarkId] = React.useState(null);

  // Object for blank form for create
  const blank = {
      title: '',
      url: ''
      }

  // Function to get bookmarks from API
  const getInfo = async () => {
      const response = await fetch('https://bookmarkd-api.herokuapp.com/bookmarks');
      const result = await response.json();
      setBookmarks(result);
  };

  React.useEffect(() => {
      getInfo();
  }, []);

  const handleDelete = async (id) => {
      const response = await fetch(`https://bookmarkd-api.herokuapp.com/bookmarks/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
              'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
          }
      })
      getInfo();
  }

  const openEditForm = async (id) => {
      setEditingBookmarkId(id)
  }

  const handleEdit = async (id, newData) => {
      const response = await fetch(`https://bookmarkd-api.herokuapp.com/bookmarks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
              'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
          },
          body: JSON.stringify(newData)
      })
      setEditingBookmarkId(null);
      getInfo();
  }


  const handleCreate = async (data) => {
      const response = await fetch('https://bookmarkd-api.herokuapp.com/bookmarks/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key', 
              'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
          },
          body: JSON.stringify(data)
      })
      getInfo();
  }
  return (
    <div className="main-app">
            <h1 className="main-app__title">/B/ookmark\'d</h1>
                <h3 className="main-app__create">Create a bookmark</h3>
                <Form formType="add" initial={blank} handleSubmit={handleCreate}/>
            <div className="main-app__bookmarks">
            <ul>
                {bookmarks
                ? bookmarks.sort((bookmark1, bookmark2) => {
                    if(bookmark1.title < bookmark2.title) { return -1; }
                    if(bookmark1.title > bookmark2.title) { return 1; }
                    return 0;
                })
                    .map((bookmark) => {
                    return (
                        <li key={bookmark._id} className="main-app__bookmarks--items">
                            <div className="main-app__bookmarks--main-container">
                                <a href={bookmark.url} target="_blank" rel="noopener noreferrer"><h2>{bookmark.title}</h2></a>
                                <div className="main-app__bookmarks--editdelete">
                                    <button
                                    className="main-app__bookmarks--update"
                                        onClick={() => {
                                            openEditForm(bookmark._id);
                                        }}
                                    >
                                        ✎
                                    </button>
                                    <button
                                    className="main-app__bookmarks--delete"
                                        onClick={() => {
                                            handleDelete(bookmark._id);
                                        }}    
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                                {/* see if initial works */}
                                {bookmark._id === editingBookmarkId &&
                                    <Form formType="edit" initial={bookmark}
                                        handleSubmit={(newData) => handleEdit(bookmark._id, newData)}
                                    />
                                }

                        </li>
                    )
                }) : 'LOADING...'}
            </ul>
            </div>
            </div>
  );
}

export default App;
