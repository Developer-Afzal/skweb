import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import menuIcon from '../Images/menu.png'
import { useNavigate } from 'react-router-dom';
import { GetLogout } from '../features/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from '../Context/SnackbarContext';
import { POST } from '../utils/Api';
export default function Drawer() {
  const [state, setState] = React.useState({left: false});
  const showSnackbar = useSnackbar();

  const auth = useSelector(state => state.Auth?.UserToken)
  const navigate = useNavigate() 
  const dispath = useDispatch()
  const menuData = [
    {listName:'Dashboard', path:'/', Icon:<HomeIcon sx={{color:'White'}}/>},
    {listName:'Students List', path:'/studentlist', Icon:<FormatListBulletedIcon sx={{color:'White'}}/> },
    {listName:'Fee Status', path:'/feestatus', Icon:<CurrencyRupeeIcon sx={{color:'White'}}/> },
    {listName:'Important Dates', path:'/importantDate', Icon:<CalendarMonthIcon sx={{color:'White'}}/>},
    {listName:'Exam', path:'/exam', Icon:<AssignmentTurnedInIcon sx={{color:'White'}}/>}
]

const GoPage = (value)=>{
  navigate(value)
}

const LogoutUser = async() => {
  dispath(GetLogout())
  navigate('/')
  const Response = await POST('/logout')
  showSnackbar('You have been logged out', 'warning');
}



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuData.map((text, index) => (
          <ListItem  disablePadding key={index}>
            <ListItemButton  onClick={()=>  GoPage(text.path) }>
              <ListItemIcon>
                 {text.Icon}
              </ListItemIcon>
              <ListItemText primary={text.listName} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem> 
        <ListItemButton onClick={()=> LogoutUser()}>
        <ListItemText primary={'Logout'} sx={{paddingLeft:'40px'}} />
        </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
        <React.Fragment>
          <Button onClick={auth !== null ? toggleDrawer('left', true) : null} >
            <img src={menuIcon}/>
            </Button>
          <SwipeableDrawer 
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            <div style={{background:'#dd940b', color:'White', height:'100%'}}>
            {list('left')}
            </div>
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}