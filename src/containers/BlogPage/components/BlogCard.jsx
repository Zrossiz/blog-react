import './BlogCard.css'

import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export const BlogCard = ({ title,
    description,
    liked,
    likePost,
    deletePost,
    handleEditFormShow,
    handleSelectPost
}) => {

    const showEditForm = () => {
        handleSelectPost();
        handleEditFormShow();
    }

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
            <div className="postControl">
                <button onClick={showEditForm}>
                    <ModeEditIcon className='editBtn'/>
                </button>
                <button className="deleteBtn" onClick={deletePost}>
                    <DeleteIcon />
                </button>
            </div>
            
        </div>
    )
} 
