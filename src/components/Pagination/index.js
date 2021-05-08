import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const PaginationComponent = ({ currentPage, items, totalPage, onClick }) => {
  
  return (
    <Pagination>
      {currentPage > 1 && (
        <PaginationItem onClick={() => onClick(1)} disabled={currentPage <= 1}>
          <PaginationLink tag="button">
            First
          </PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem onClick={() => onClick(currentPage - 1)} disabled={currentPage <= 1}>
        <PaginationLink previous tag="button" />
      </PaginationItem>
      {items.map((page, index) => {
        return (
          <PaginationItem key={index} onClick={() => onClick(page)} active={currentPage === page}>
            <PaginationLink tag="button">
              {page}
            </PaginationLink>
          </PaginationItem>
        )
      })}
      <PaginationItem onClick={() => onClick(currentPage + 1)} disabled={currentPage >= totalPage}>
        <PaginationLink next tag="button" />
      </PaginationItem>
      {currentPage < totalPage && (
        <PaginationItem onClick={() => onClick(totalPage)} disabled={currentPage >= totalPage}>
          <PaginationLink tag="button">
            Last
          </PaginationLink>
        </PaginationItem>
      )}
    </Pagination>
  )
}

PaginationComponent.propTypes = {
  currentPage: PropTypes.number,
  items: PropTypes.array,
  totalPage: PropTypes.number,
  onClick: PropTypes.func
};

PaginationComponent.defaultProps = {
  currentPage: 1,
  totalPage: 1,
  items: [],
  onClick: () => {}
}

export default React.memo(PaginationComponent);