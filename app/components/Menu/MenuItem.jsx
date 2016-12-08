/* @flow weak */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import Menu from './Menu'

const triangleIcon = (<div
  style={{
    marginLeft: 'auto',
    marginRight: '-10px',
    content: '',
    marginTop: '6px',
    width: 0,
    height: 0,
    borderTop: '4px solid transparent',
    borderLeft: '8px solid #ccc',
    borderBottom: '4px solid transparent'
  }}
/>)


const handleMenuItemCommand = (item) => {
  if (typeof item.command === 'function') {
    item.command()
    return true
  } else if (typeof item.command === 'string') {
    // ↓ temporary measure to resolve a cyclic dependent conflict
    require('../../commands').dispatchCommand(item.command)
    return true
  }
}

const MenuItem = ({item, index, isActive, toggleActive, deactivateTopLevelMenu, state}) => {
  if (item.name == '-') return <li><hr /></li>
  const disabled = item.checkDisable ? item.checkDisable(state) : item.isDisabled
  return (
    <li className='menu-item'>
      <div
        className={cx('menu-item-container', {active: isActive, disabled: disabled, padding: '4px 8px' })}
        onMouseEnter={e => toggleActive(index)}
        onClick={e => {
          if(disabled)
            return
          handleMenuItemCommand(item)&&deactivateTopLevelMenu()
        }} >
        <div className={item.icon} style={{ paddingTop: '3px', marginRight: '8px', marginLeft: '-6px' }}></div>
        <div className='menu-item-name'>{item.displayName || item.name}</div>
        { item.shortcut?
          <div className='menu-item-shortcut'>{item.shortcut}</div>
          : null }
        {
          item.items && item.items.length ?
          triangleIcon : null
        }
      </div>
      { isActive && item.items && item.items.length ?
        <Menu items={item.items} className={cx({active: isActive})}
          deactivateTopLevelMenu={deactivateTopLevelMenu} />
        : null}
    </li>
  )
}

export default MenuItem
