import * as React from 'react'
import Bind from 'autobind-decorator'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import { List, ListItem, Dialog, DialogTitle, ListItemAvatar, ListItemIcon,
  Avatar, DialogActions, ListItemText, Button } from '@material-ui/core'
import Styled from '../Styled'

@Styled(() => ({
  active: {
    textDecoration: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  },
  list: {
    minWidth: 320
  }
}) as any)
@(connect as any)(store => ({ user: store.user }))
@Bind
export default class LeftNav extends React.Component<{
  classes?: Record<string, string>,
  open: boolean,
  user?: { profiles: Array<{ uuid: string, name: string }> },
  onClose: () => void,
  onLaunch: (name: string) => void
}> {
  public state = { name: '' }
  public render () {
    const { open, user, onClose, classes } = this.props

    return (
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby='simple-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>选择游戏名</DialogTitle>
        <List className={classes.list}>
          {user.profiles.map(({ uuid, name }) => (
            <ListItem
              button
              className={this.state.name === name ? classes.active : ''}
              onClick={() => this.setState({ name })}
              key={uuid}
            >
              <ListItemAvatar>
                <Avatar>{name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItem>
          ))}
          <ListItem button onClick={onClose}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='创建游戏名' />
          </ListItem>
        </List>
        <DialogActions>
          <Button onClick={onClose}>取消</Button>
          <Button onClick={this.handleOk} color='primary'>启动游戏</Button>
        </DialogActions>
      </Dialog>
    )
  }

  private handleOk () {
    this.props.onClose()
    this.props.onLaunch(this.state.name)
  }
}
