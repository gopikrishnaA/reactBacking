import React from 'react'
import styled from 'styled-components'

import Badge from '@material-ui/core/Badge'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'

const StyledBadge = styled(Badge)`
  span {
    font-weight: 700;
  }
`
const StyledIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`
const CustomLink = () => {
  return (
    <StyledBadge badgeContent={3} color="secondary">
      <StyledIcon icon={faHeartbeat} />
    </StyledBadge>
  )
}

export default CustomLink
