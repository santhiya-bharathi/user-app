// import logo from './logo.svg';
import './App.css';
import { Switch, Route, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function App() {

const usersList = [
  {profile:"https://qph.fs.quoracdn.net/main-qimg-e506e86f20d570f61630162861d0bd80", name:"nayanthara"},
  {profile:"https://thandoratimes.com/flcimgs/news-images/is-surya-ready-to-act-in-a-web-series.jpg", name:"surya"},
{profile:"https://i.pinimg.com/originals/a4/37/21/a4372103eb4af7e6ab6def1a5ecd80ba.jpg", name:"harish kalyan"},
{profile:"https://www.telugubulletin.com/wp-content/uploads/2021/06/thumb-696x522.jpg", name:"priyabhavani shankar"},
{profile:"https://images.news18.com/ibnlive/uploads/2021/09/thalapathy-vijay.jpg", name:"vijay"},
{profile:"https://pbs.twimg.com/profile_images/727053878978449408/rHgoO6Za_400x400.jpg", name:"kajal aggarwal"},
{profile:"https://szcdn.ragalahari.com/feb2021/hd/vijay-sethupathi-uppena-pre-release/vijay-sethupathi-uppena-pre-release-1x.jpg", name:"vijay sethupathi"},
{profile:"https://liveheed.com/wp-content/uploads/2020/05/vijay_devarakonda.jpg", name:"vijay devarakonda"},
{profile:"https://www.bollywoodhungama.com/wp-content/uploads/2021/05/EXCLUSIVE-Here%E2%80%99s-who-Samantha-Ruth-Prabhu-would-like-to-romance-on-screen-in-a-Bollywood-film1-2.jpg", name:"samantha"},
{profile:"https://i.pinimg.com/originals/10/1d/71/101d7125db02ba64473121eb6b397910.jpg", name:"jothika"}
]




const [userslist, setUserslist] = useState(usersList);
  const history = useHistory();
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});
  return (
     // themeprovider for dark and light mode

      // paper for blackground
      <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} style={{borderRadius:"0px",minHeight:"100vh"}}>

    <div className="App">
       <AppBar position="static">
       <Toolbar>
       <Button varient="text" color="inherit" onClick={()=>history.push("/")}>Home</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/createuser")}>create user</Button>
       <Button varient="text" color="inherit" onClick={()=>history.push("/userlist")}>User list</Button>

       <Button varient="text" color="inherit" style={{marginLeft:"auto"}} onClick={()=>setMode(mode==="light"? "dark":"light")}> {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
       </Toolbar>
       </AppBar>
      
       <Switch>
      
      <Route exact path="/">
          <Home />
        </Route>

        <Route path="/createuser">
          <Createuser userslist={userslist} setUserslist={setUserslist}/>
        </Route>

        <Route path="/userlist/edit/:id">
          <Edituser userslist={userslist} setUserslist={setUserslist}/>
        </Route>

        <Route path="/userlist">
          <Userlist userslist={userslist} setUserslist={setUserslist}/>
        </Route>

        <Route path="**">
          <NotFound/>
        </Route>

      </Switch>
    </div>
    </Paper>
    </ThemeProvider>
  );
}


//creating home page
function Home() {
  const history = useHistory();
  return (
    <div className="home">
      <h2 className="home-hello">Hello All!!!</h2>
      <img src="https://acegif.com/wp-content/uploads/2021/01/welcome-m.gif" alt="welcome"/>
      <div>
      <Button onClick={()=>history.push("/userlist") }variant="contained"><ArrowForwardIcon/>Go to User-Page</Button>
      </div>
    </div>
  );
}

//creating not found page
function NotFound(){
  return(
    <div className="not-found-pic">
      <h1 className="not-found-name">404 Not Found</h1>
      <img  src="https://s12emagst.akamaized.net/assets/hu/images/error_404_600px.gif" alt="404 not found"/>
    </div>
  );
}

function Createuser({userslist,setUserslist}){
  const history = useHistory();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

const addUser =()=>{
  const newUser= {profile, name};//shorthand
  setUserslist([...userslist,newUser]);
  history.push("/userlist");
};

  return(
    <div className="create-list-place">
      <TextField value={profile} 
      onChange={(event)=>setProfile(event.target.value)}  label="enter profile url" variant="filled" />
     
     <TextField value={name}
      onChange={(event)=>setName(event.target.value)} label="enter name" variant="filled" />

      <Button onClick={addUser} variant="contained">Create User</Button>
    </div>
  
  );
}

function Edituser({userslist,setUserslist}){
  const history = useHistory();
  const {id} = useParams();
  const userdet = userslist[id]; 
  const [name, setName] = useState(userdet.name);
  const [profile, setProfile] = useState(userdet.profile);

  const editUser =()=>{
    
    const updatedUser= {profile, name};//shorthand
    console.log(updatedUser);

    const copyUserList =[...userslist];
    copyUserList[id] = updatedUser;
    setUserslist(copyUserList);
    history.push("/userlist");
  };
  return(
    <div className="create-list-place">
    <TextField value={profile} 
    onChange={(event)=>setProfile(event.target.value)}  label="enter profile url" variant="filled" />
   
   <TextField value={name}
    onChange={(event)=>setName(event.target.value)} label="enter name" variant="filled" />

    <Button onClick={editUser} variant="contained">Save User</Button>
  </div>
  );
}

function Userlist({userslist,setUserslist}){
  const history = useHistory();
  return(
    <section>
      {userslist.map(({profile,name},index)=>(<Listuser profile={profile} name={name}
      id={index}
      deleteButton= {<IconButton aria-label="delete" color="error"
      onClick={()=>{
        console.log("deleting...",index);
        const deleteIdx = index;
        const remainingUsers = userslist.filter((urs,idx)=>idx!==deleteIdx);
        console.log("Remaining...",remainingUsers);
        setUserslist(remainingUsers);
        }}>
      <DeleteIcon />
    </IconButton>}
      editButton= {<IconButton 
        // style={{marginLeft:"auto"}}
        aria-label="edit"  color="success"
       onClick={()=>history.push("/userlist/edit/" + index)}>
       <EditIcon />
     </IconButton>}
      />))}
    </section>
  );
}

function Listuser({profile,name,deleteButton,editButton}){
  return(
  <div className="content-div">
    <div>
  <img className="hero-img" src={profile} alt="profile"/>
  <div className="content-div-name">
  <h2>{name}</h2>
  <div className="edit-delete">
    {editButton}{deleteButton}
    </div>
  
  </div>
  <hr></hr>
  </div>
  </div>
  );
}
