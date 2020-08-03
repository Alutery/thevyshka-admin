import React from 'react';

import Pagination from 'react-paginating';

const ContentPagination = ({total, pageSize, currentPage, onCurrentPageChange, status, query}) => {

    const handlePageChange = (page) => {
        onCurrentPageChange({'page': page - 1, status, query});
    };

    return (
        <Pagination
            className="pagination"
            total={total}
            limit={pageSize}
            pageCount={3}
            currentPage={currentPage + 1}
        >
            {({
                  pages,
                  currentPage,
                  hasNextPage,
                  hasPreviousPage,
                  previousPage,
                  nextPage,
                  totalPages,
                  getPageItemProps
              }) => (
                <div>
                    <button
                        {...getPageItemProps({
                            pageValue: 1,
                            onPageChange: handlePageChange,
                            style: {fontWeight: '900'}
                        })}
                        disabled={!hasPreviousPage}
                    >
                        {'<<'}
                    </button>

                    <button
                        {...getPageItemProps({
                            pageValue: previousPage,
                            onPageChange: handlePageChange
                        })}
                        disabled={!hasPreviousPage}
                    />

                    {pages.map(page => {
                        let activePage = null;
                        if (currentPage === page) {
                            activePage = {
                                backgroundColor: 'rgba(0, 117, 180, 0.42)',
                                color: 'white',
                                fontWeight: '700'
                            };
                        }
                        return (
                            <button
                                {...getPageItemProps({
                                    pageValue: page,
                                    key: page,
                                    style: activePage,
                                    onPageChange: handlePageChange
                                })}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        {...getPageItemProps({
                            pageValue: nextPage,
                            onPageChange: handlePageChange
                        })}
                        disabled={!hasNextPage}
                    />

                    <button
                        {...getPageItemProps({
                            pageValue: totalPages,
                            onPageChange: handlePageChange,
                            style: {fontWeight: '900'}
                        })}
                        disabled={!hasNextPage}
                    >
                        {'>>'}
                    </button>
                </div>
            )}
        </Pagination>
    );
};

export default ContentPagination;