import React, { useState, useEffect } from 'react'

interface Props {
    totalRecords: number | null | undefined
    pageLimit: number
    pageNeighbours: number
    onPageChanged: (page: number) => void,
    reset: boolean
}

const LEFT_PAGE: string = 'LEFT';
const RIGHT_PAGE: string = 'RIGHT';

const range = (from: number, to: number, step: number = 1) => {
    let i = from;
    const range: number[] = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  }

const Pagination: React.FC<Props> = (props) => {
    const { totalRecords = 0, pageLimit = 30, pageNeighbours = 0, onPageChanged, reset } = props
    const totalPages = Math.ceil(totalRecords! / pageLimit)

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
      setCurrentPage(1)
  }, [reset]);

    const fetchPageNumbers = () => {
        const totalNumbers: number = (pageNeighbours * 2) + 3;
        const totalBlocks: number = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage: number = Math.max(2, currentPage - pageNeighbours);
            const endPage: number = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages: Array<number | string> = range(startPage, endPage);

            const hasLeftSpill: boolean = startPage > 2;
            const hasRightSpill: boolean = (totalPages - endPage) > 1;
            const spillOffset: number = totalNumbers - (pages.length + 1);

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                  const extraPages: number[] = range(startPage - spillOffset, startPage - 1);
                  pages = [LEFT_PAGE, ...extraPages, ...pages];
                  break;
                }
        
                case (!hasLeftSpill && hasRightSpill): {
                  const extraPages = range(endPage + 1, endPage + spillOffset);
                  pages = [...pages, ...extraPages, RIGHT_PAGE];
                  break;
                }
        
                case (hasLeftSpill && hasRightSpill):
                default: {
                  pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                  break;
                }
            }
            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    }

    if (!totalRecords || totalPages === 1) return null;

    const pages = fetchPageNumbers();

    const gotoPage = (page: number) => {
    
        const currentPage = Math.max(0, Math.min(page, totalPages));
    
        onPageChanged(currentPage)
        setCurrentPage(currentPage)
      }

      const handleClick = (page: number) => {
        gotoPage(page);
      }

      const handleMoveLeft = () => {
        gotoPage(currentPage - (pageNeighbours * 2) - 1);
      }

      const handleMoveRight = () => {
        gotoPage(currentPage + (pageNeighbours * 2) + 1);
      }

    return (
        <>
            <nav>
                <ul className="pagination">
                    { pages.map((page, index) => {

                    if (page === LEFT_PAGE) return (
                        <li key={index} className="page-item">
                          <div className="page-link" onClick={handleMoveLeft}>
                              <span aria-hidden="true">&laquo;</span>
                          </div>
                        </li>
                    );

                    if (page === RIGHT_PAGE) return (
                        <li key={index} className="page-item">
                          <div className="page-link" onClick={handleMoveRight}>
                              <span aria-hidden="true">&raquo;</span>
                          </div>
                        </li>
                    );

                    return (
                        <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                            <div className="page-link" onClick={() => handleClick(+page)}>{ page }</div>
                        </li>
                    );

                    }) }

                </ul>
            </nav>
        </>
    )
}

export default Pagination