import './BlogCard.css'

import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'

export const BlogCard = ({ title, description, liked, likePost, deletePost}) => {

    const heartFill = liked ? 'crimson' : 'black'

    return (
        <div className="post">
            <div className="postContent">
               <h2>{title}</h2>
                <p>{description}</p>

                <div>
                    <button onClick={likePost}>
                        <FavoriteIcon style={{fill:heartFill}} />    
                    </button>
                </div> 
            </div>
            
            <button className="deleteBtn" onClick={deletePost}>
                <DeleteIcon />
            </button>
        </div>
    )
} 
