import * as React from 'react';
import cx from 'classnames';
import './style.css';

const App = () => {
  const [instaData, setinstaData] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState({ order: 'ASC', orderBy: 'likes', likes: 'ASC', timestamp: 'ASC' });

  React.useEffect(() => {
    fetch('http://starlord.hackerearth.com/insta')
      .then((res) => res.json())
      .then((list) => setinstaData(list));
  }, []);

  const renderList = () => {
    if (instaData && instaData.length > 0) {
      return instaData.sort(customSort).map((indvObj) => {
        return (<div key={indvObj.timestamp} className="imageContainer">
          <div className="card">
            <img src={indvObj.Image} className="image" />
            {renderSVG(indvObj)}
            {renderLikes(indvObj)}
          </div>
        </div>)
      })
    } else {
      return <span>...Loading</span>
    }
  }

  const renderImageSection = () => {
    return <div className="parentContainer">{renderList()}</div>
  }

  const renderLikes = (indvObj) => {
    return <span className="likes">{indvObj.likes} Likes |       {indvObj.Image.substr(indvObj.Image.lastIndexOf('/') + 1)}
    </span>
  }

  const renderTimeStamp = (indvObj) => {
    return <span className="likes">{indvObj.timestamp}</span>
  }

  const renderSVG = (indvObj) => {
    return <div className="svgContainer">
      <div>
        <div className="svg"><svg aria-label="Like" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></div>
        <div className="svg"><svg aria-label="Comment" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg></div>
        <div className="svg"><svg aria-label="Share Post" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg></div>
      </div>
      {renderTimeStamp(indvObj)}
    </div>
  }


  const renderSort = () => {
    return (<div className="sortContainer">
      <span className="sort">Sort By</span>
      <span className={cx("others", sortOrder.orderBy === "likes" && "current")} onClick={sort.bind(this, 'likes')}>Likes  {renderArrow(sortOrder.likes)}</span>
      <span className={cx("others", sortOrder.orderBy === "timestamp" && "current")} onClick={sort.bind(this, 'timestamp')}>TimeStamp  {renderArrow(sortOrder.timestamp)}</span>
    </div>)
  }

  const renderArrow = (type) => {
    if (type === 'ASC') {
      return <span>&#8593;</span>
    } else {
      return <span>&#8595;</span>
    }
  }

  const sort = (type) => {
    setSortOrder({
      order: sortOrder[type] === 'ASC' ? 'DESC' : 'ASC',
      orderBy: type,
      [type]: sortOrder[type] === 'ASC' ? 'DESC' : 'ASC',
    });
  }

  const customSort = (obj1, obj2) => {
    let val1, val2;
    if (sortOrder.orderBy === 'likes') {
      val1 = obj1.likes;
      val2 = obj2.likes;
    } else {
      val1 = new Date(obj1.timestamp);
      val2 = new Date(obj2.timestamp);
    }
    if (val1 > val2) {
      if (sortOrder.order === 'ASC') {
        return 1;
      } else {
        return -1;
      }
    } else if (val1 < val2) {
      if (sortOrder.order === 'ASC') {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  }
  return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {renderSort()}
    {renderImageSection()}
  </div>);
}

export default App;