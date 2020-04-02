import React from 'react'
import PropTypes from 'prop-types'
import Popover from '../popover'
import Flex from '../flex'
import Button from '../button'
import _ from 'lodash'
import { getLocale } from '@gmfe/locales'

const colorList = [
  {
    value: '#E96A5D',
    text: getLocale('红色')
  },
  {
    value: '#EDA55D',
    text: getLocale('橙色')
  },
  {
    value: '#7DCC70',
    text: getLocale('绿色')
  },
  {
    value: '#518FF0',
    text: getLocale('蓝色')
  },
  {
    value: '#A977CF',
    text: getLocale('紫色')
  },
  {
    value: '#9C9CA0',
    text: getLocale('灰色')
  }
]

class Color extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: props.color || '#ffffff'
    }
    this.colorInputRef = React.createRef()
  }

  handleColorChange = e => {
    const value = e.target ? e.target.value : e
    this.setState({
      color: value
    })
  }

  handleConfirm = () => {
    this.props.onConfirm(this.state.color)
  }

  handleCustomColor = e => {
    e.preventDefault()
    this.colorInputRef.current.click()
  }

  render() {
    const { onCancel } = this.props
    const { color } = this.state

    return (
      <Flex column className='gm-color-picker'>
        {_.map(colorList, color => (
          <Flex
            alignCenter
            key={color.value}
            className='gm-color-picker-color-default-item gm-bg-hover-primary'
            onClick={() => this.handleColorChange(color.value)}
          >
            <div
              style={{
                background: color.value
              }}
              className='gm-color-picker-color-point'
            />
            <div className='gm-padding-lr-10'>{color.text}</div>
          </Flex>
        ))}

        <Flex alignCenter>
          <div
            style={{
              background: color
            }}
            className='gm-color-picker-color-point'
          />
          <div className='gm-color-picker-addon'>#</div>
          <input
            type='text'
            value={color.replace('#', '')}
            onChange={e => this.handleColorChange(`#${e.target.value}`)}
          />
        </Flex>
        <input
          ref={this.colorInputRef}
          type='color'
          value={color.slice(0, 7)}
          onChange={this.handleColorChange}
          className='gm-hidden'
        />

        <Flex justifyCenter className='gm-padding-tb-5'>
          <a onClick={this.handleCustomColor} className='gm-cursor'>
            {getLocale('自定义颜色')}
          </a>
        </Flex>

        <Flex justifyCenter className='gm-margin-top-20'>
          <Button block onClick={onCancel}>
            {getLocale('取消')}
          </Button>
          <div className='gm-gap-20' />
          <Button block onClick={this.handleConfirm} type='primary'>
            {getLocale('确定')}
          </Button>
        </Flex>
      </Flex>
    )
  }
}

Color.propTypes = {
  color: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.popoverRef = React.createRef()
  }

  handleConfirm = color => {
    this.popoverRef.current.apiDoSetActive(false)
    this.props.onChange(color)
  }

  handleCancel = () => {
    this.popoverRef.current.apiDoSetActive(false)
  }

  render() {
    const { color, children } = this.props

    return (
      <Popover
        ref={this.popoverRef}
        animName
        type='click'
        showArrow
        popup={
          <Color
            color={color}
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
          />
        }
      >
        {children}
      </Popover>
    )
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.any.isRequired
}

ColorPicker.defaultProps = {
  color: '#ffffff',
  onChange: _.noop
}

export default ColorPicker
