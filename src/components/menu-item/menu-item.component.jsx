import React from 'react'
import './menu-item.styles.css'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

// const MenuItem = ({title, imgUrl, size, linkUrl}) => (
const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    // <div className={`${size} menu-item`}>
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div className='background-image' style={{backgroundImage: `url(${imageUrl})` }} />
        <div className='content'>
            <h2>{title.toUpperCase()}</h2>
            <span>SHOP NOW</span>
        </div>
    </div>
)

function withRouter(Component){
    function ComponentWithRouterProp(props){
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        // console.log(props)

        return(
            <Component {...props} router={{location, navigate, params}} />
        );
    }

    return ComponentWithRouterProp;
}

// export default MenuItem;
export default withRouter(MenuItem); // withRouter takes the argument, rebuild it by injecting it's objects into it then returns it.