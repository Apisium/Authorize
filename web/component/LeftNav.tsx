import * as React from 'react'
import Bind from 'autobind-decorator'
import AccountBox from '@material-ui/icons/AccountBox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import MapIcon from '@material-ui/icons/Map'
// import MenuIcon from '@material-ui/icons/Menu'
import { List, ListItem, ListSubheader, ListItemText, SwipeableDrawer,
  Divider, ListItemIcon, Avatar,
  Collapse, withWidth } from '@material-ui/core'
import Styled from '../Styled'

@Styled(theme => ({
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    width: 240,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  item: {
    paddingLeft: 16
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  hidden: {
    display: 'none'
  },
  button: {
    margin: theme.spacing.unit
  },
  toolbar: theme.mixins.toolbar
}) as any)
@(withWidth as any)()
@Bind
export default class LeftNav extends React.Component<{
  width?: string,
  classes?: Record<string, string>,
  open: boolean,
  onOpen: () => void,
  onClose: () => void
}> {
  public state = { openId: '', more: false }
  public render () {
    const { openId, more } = this.state
    const { open, width, onOpen, onClose, classes } = this.props
    const xs = width === 'xs'

    return (
      <SwipeableDrawer
        classes={{ paper: open || xs ? classes.drawerPaper : classes.drawerPaperClose }}
        variant={xs ? 'temporary' : 'permanent'}
        onClose={onClose}
        onOpen={onOpen}
        open={!xs || open}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List
          subheader={<ListSubheader
            component='div'
            className={xs || open ? '' : classes.hidden}
          >服务器列表</ListSubheader>}
        >
          {[{ name: '切糕服务器', id: 'abch' }].map(({ name, id }) => {
            const o = openId === id
            return (
              <React.Fragment key={id}>
                <ListItem
                  dense
                  button
                  onClick={() => this.setState({ openId: !o && id })}
                  className={classes.item}
                >
                  <Avatar alt={name}>{name[0]}</Avatar>
                  <ListItemText primary={name} />
                  {o ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={o} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon><MapIcon /></ListItemIcon>
                      <ListItemText inset primary='服务器地图' />
                    </ListItem>
                  </List>
                </Collapse>
              </React.Fragment>
            )
          })}
        </List>
        <Divider />
        <List
          subheader={<ListSubheader
            component='div'
            className={xs || open ? '' : classes.hidden}
          >更多</ListSubheader>}
        >
          <ListItem
            dense
            button
            onClick={this.toggleMore}
            className={classes.item}
          >
            <Avatar><AccountBox /></Avatar>
            <ListItemText primary='账户' />
            {more ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={more} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText inset primary='游戏名管理' />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </SwipeableDrawer>
    )
  }

  private toggleMore () {
    this.setState({ more: !this.state.more })
  }
}
