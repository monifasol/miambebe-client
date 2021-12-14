import { React, useContext, useEffect, useState } from 'react'
import editIcon from "../../images/edit-icon.png"
import { CurrentDataContext } from '../../context/currentData.context'

const RecipeSelected = ( { recipe, submitRecipeChange } ) => {


    const { currentUser } = useContext(CurrentDataContext)
    const [ isWritter, setIsWritter ] = useState(false)
    const [ dataBeforeEdit, setDataBeforeEdit ] = useState({})


    useEffect(() => {
        if (recipe && recipe.user && currentUser) {
            if (currentUser._id === recipe.user._id) {
                setIsWritter(true)
            }
        }
    }, [recipe, currentUser])


    // Set Data state before Editing 
    useEffect(() => {
        if (recipe) {
            setDataBeforeEdit( { 
                            title: recipe.title,
                            content: recipe.content
                        })
        }
    }, [recipe, currentUser])



    const toggleEditIcon = (e, action) => {
        let iconEl = e.target.querySelector('.edit-icon')

        if (iconEl) {
            if (action === 'show') iconEl.classList.add("show")
            else if (action === 'hide') iconEl.classList.remove("show")
        }
    }


    const handleSubmit = (e) => {

        let value = e.target.innerText
        let tooltipErr = e.target.parentElement.querySelector('.tooltip-form.error')
        let field = e.target.attributes.fieldtoedit.value

        if (value === "") {

            e.target.innerText = dataBeforeEdit[field]

            tooltipErr.classList.add('show')
            tooltipErr.innerText = `${field} was empty!`
            setTimeout(()=>{ tooltipErr.classList.remove('show')}, 1000)

        } else {
            
            setDataBeforeEdit[field] = value
            submitRecipeChange(e, recipe._id)
        }          
    }

    return (    
        <div className="recipe-card">

        { recipe &&

         <>
            { !isWritter
            
            ? 
            <>
                SHOW READ ONLY RECIPE
            </>

            :

            <>

                <span className="tooltip-form info"></span>
                <span className="tooltip-form error"></span>

                <p contentEditable
                        onBlur={(e) => handleSubmit(e) }
                        onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                        onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                        fieldtoedit="title"
                        className="content-editable recipe title"
                        suppressContentEditableWarning={true} >
                    { dataBeforeEdit.title || recipe.title }
                    <img src={editIcon} alt="edit icon" className="edit-icon" />
                </p>
                
                <p className="writter">by {recipe.user && recipe.user.name} </p>

                <div className="bar-bottom">
                    <p className="prep-time">
                        Preparation time: {recipe.preparationTime} min
                    </p>

                    <p className="difficulty">
                        difficulty: {recipe.difficulty} 
                    </p>
                </div>

                <p contentEditable
                        onBlur={(e) => handleSubmit(e) }
                        onMouseOver={ (e) => toggleEditIcon(e, 'show') }
                        onMouseOut={ (e) => toggleEditIcon(e, 'hide') }
                        fieldtoedit="content"
                        className="content-editable recipe content"
                        suppressContentEditableWarning={true} >
                    { dataBeforeEdit.content || recipe.content}
                    <img src={editIcon} alt="edit icon" className="edit-icon" />
                </p>

                <p> 
                    { recipe.tags && recipe.tags.map((tag, i) => 
                        <span className="tag" key={i}> {tag} </span>
                    ) }
                </p>

                <p className="intolerances">
                    <span className="intolerances-label">Possible intolerances: </span>
                    { recipe.intolerances && recipe.intolerances.map((into, i) => 
                        <span className="tag" key={i}> {into} </span>
                    ) }
                </p>    

            </>
        }
         </>
         
         }

        </div>
    )
}

export default RecipeSelected
