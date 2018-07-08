import * as React from 'react'
import { Menu, Avatar, MenuItem, AppBar, Toolbar, IconButton,
  Typography } from '@material-ui/core'
import Styled from '../Styled'

@Styled(theme => ({
  flex: {
    flex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}))
export default class TopBar extends React.Component<{
  button: JSX.Element,
  launch: JSX.Element,
  classes?: Record<string, string>
}> {
  public state = {
    auth: true,
    anchorEl: undefined
  }

  public render () {
    const { classes, button, launch } = this.props
    const { anchorEl } = this.state
    const open = !!anchorEl

    return (
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar>
          {button}
          <Typography variant='title' color='inherit' className={classes.flex}>
            Authorize
          </Typography>

          {launch}
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup
            onClick={this.handleMenu}
            color='inherit'
          >
            <Avatar>H</Avatar>
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>退出登录</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }

  // private handleChange (event, checked) {
  //   this.setState({ auth: checked })
  // }

  private handleMenu (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  private handleClose () {
    this.setState({ anchorEl: null })
  }
}
