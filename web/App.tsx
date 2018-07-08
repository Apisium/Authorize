import * as React from 'react'
import Bind from 'autobind-decorator'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { IconButton, withWidth, Button } from '@material-ui/core'
import withRoot from './withRoot'
import TopBar from './component/TopBar'
import Launch from './component/Launch'
import LeftNav from './component/LeftNav'
import Styled from './Styled'

@Styled(theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
}))
@(withWidth as any)()
@withRoot
@Bind
export default class App extends React.Component<{ width?: string, classes?: Record<string, string> }> {
  public state = {
    launch: false,
    open: this.props.width !== 'xs' && this.props.width !== 'sm'
  }
  public render () {
    const { open, launch } = this.state
    const { classes } = this.props
    return (
      <div>
        <TopBar
          button={<IconButton
            color='inherit'
            aria-label='Menu'
            onClick={this.toggle}
            className={classes.menuButton}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>}
          launch={<Button color='inherit' onClick={this.handleLaunchOpen}>启动游戏</Button>}
        />
        <LeftNav open={open} onOpen={this.handleOpen} onClose={this.handleClose} />
        <Launch
          open={launch}
          onClose={this.handleLaunchClose}
          onLaunch={this.handleLaunch}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    )
  }

  private toggle () {
    this.setState({ open: !this.state.open })
  }
  private handleOpen () {
    this.setState({ open: true })
  }
  private handleClose () {
    this.setState({ open: false })
  }
  private handleLaunchClose () {
    this.setState({ launch: false })
  }
  private handleLaunchOpen () {
    this.setState({ launch: true })
  }
  private handleLaunch (name: string) {
    console.log(name)
  }
}
