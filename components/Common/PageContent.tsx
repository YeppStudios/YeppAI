import React from 'react';
import styled from 'styled-components';

const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media (max-width: 1023px) {
    flex-wrap: wrap;
    height: 100%;
    padding-bottom: 2rem;
}
`

export default PageContent;
