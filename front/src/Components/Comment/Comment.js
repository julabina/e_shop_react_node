import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';

const Comment = (props) => {

    const dispatch = useDispatch();

    const [comment, setComment] = useState([]);
    const [commentToSend, setCommentToSend] = useState("");
    const [commentDate, setCommentDate] = useState({created: "", updated: ""});
    const [commentTS, setCommentTS] = useState({created: "", updated: ""});
    const [commentTime, setCommentTime] = useState({created: "", updated: ""});
    const [userName, setUserName] = useState({firstName: null, lastName: null});
    const [newTextComment, setNewTextComment] = useState(props.comment);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalComment, setModalComment] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [onModify, setOnModify] = useState(false);

    useEffect(() => {

        getUserName();
        
        convertTime();
        
        if(props.comment.includes(`<br />`)) {
            const brCommentArr = props.comment.split('<br />');
            const brComment = brCommentArr.join('\n');
            setNewTextComment(brComment);
            setComment(brCommentArr);
        } else {
            const toArr = [props.comment];
            setNewTextComment(props.comment);
            setComment(toArr);
        }

    },[props.updated]);

    /**
     * GET USER NAME
     */
    const getUserName = () => {

        fetch("http://localhost:3000/api/users/" + props.userId)
            .then(res => res.json())
            .then(data => {
                let lastName = null;
                if (data.data.lastName !== null) {
                    lastName = data.data.lastName.charAt(0);
                }
                const newObj = {
                    firstName: data.data.firstName,
                    lastName: lastName
                };
                setUserName(newObj);
            })
    };

    /**
     * CONVERT THE API DATE FOR APPLICATE TO COMMENTS
     */
    const convertTime = () => {

        let createdTS = props.created;
        let updatedTS = props.updated;
        let createdDate = new Date(createdTS);
        let updatedDate = new Date(updatedTS);
        let createdHours = (createdDate.getHours() < 10 ? '0' : '') + createdDate.getHours();
        let createdMinutes = (createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes();
        let createdSecondes = (createdDate.getSeconds() < 10 ? '0' : '') + createdDate.getSeconds();
        let updatedHours = (updatedDate.getHours() < 10 ? '0' : '') + updatedDate.getHours();
        let updatedMinutes = (updatedDate.getMinutes() < 10 ? '0' : '') + updatedDate.getMinutes();
        let updatedSecondes = (updatedDate.getSeconds() < 10 ? '0' : '') + updatedDate.getSeconds();
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let timeOptions = { hh: 'numeric', mm: 'numeric', ss: 'numeric' };
        let createdLocale = createdDate.toLocaleDateString("fr-FR", options);
        let updatedLocale = updatedDate.toLocaleDateString("fr-FR", options);
        let createdTimeLocale = createdDate.toLocaleString("fr-FR", options);
        let updatedTimeLocale = updatedDate.toLocaleString("fr-FR", options);
        const newObjDate = {
            created: createdLocale,
            updated: updatedLocale
        };
        const newObjTS = {
            created: createdTS,
            updated: updatedTS
        };
        const newObjTime = {
            created: createdHours + ":" + createdMinutes + ":" + createdSecondes,
            updated: updatedHours + ":" + updatedMinutes + ":" + updatedSecondes
        };
        setCommentTime(newObjTime);
        setCommentTS(newObjTS);
        setCommentDate(newObjDate);
    };
    
    /**
     * HANDLE COMMENT AFTER LOG CONFIRMATION
     * DELETE AND MODIFY
     * @param {*} action 
     * @param {*} newCom 
     * @returns 
     */
    const handleComment = (action, newCom) => {

        let userIdToSend = "", tokenToSend = "";
        
        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            tokenToSend = token;
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                    if(action === "modify") {
                        return toggleCommentModal("Vous devez etre connecté pour modifier un commentaire.");
                    } else if (action === "delete") {
                        toggleModalDelete();
                        return toggleCommentModal("Vous devez etre connecté pour supprimer un commentaire.");
                    }
                };
                userIdToSend = decodedToken.userId;
                dispatch ({
                    type: 'LOG'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
            if(action === "modify") {
                return toggleCommentModal("Vous devez etre connecté pour modifier un commentaire.");
            } else if (action === "delete") {
                toggleModalDelete();
                return toggleCommentModal("Vous devez etre connecté pour supprimer un commentaire.");
            }
        }; 
        
        if( action === "modify") {
            postModifyComment(userIdToSend, tokenToSend.version, newCom);
        } else if (action === "delete") {
            postDeleteComment(userIdToSend, tokenToSend.version);
        }
    };
    
    /**
     * SEND TO BACK-END THE MODIFIED COMMENT
     * @param {*} userId 
     * @param {*} token 
     * @param {*} newCom 
     */
    const postModifyComment = (userId, token, newCom) => {

        fetch('http://localhost:3000/api/comments/' + props.commentId , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            method : 'PUT',
            body: JSON.stringify({ userId : userId, comment: newCom })
        })
            .then(res => res.json())
            .then(rep => {
                props.fetchFunc(props.productId);
            })
    
    };
    
    /**
     * DELETE TO BACK-END THE COMMENT
     * @param {*} userId 
     * @param {*} token 
     */
    const postDeleteComment = (userId, token) => {

        toggleModalDelete();
        props.deleteFunc(userId, token, props.commentId);

    };

    /**
     * TOGGLE MODIFY TEXTAREA
     * IF TRUE, VALIDATE MODIFIED COMMENT AND SEND IT TO handleComment FUNCTION
     */
    const openModify = () => {

        if(onModify) {
            
            if(newTextComment !== "") {
                let newCommentArr = newTextComment.split('\n');
                for (let i = 0;i < newCommentArr.length; i++) {
                    if(!newCommentArr[i].match(/^[a-zA-Zé èà,.'-€:!?]*$/)) {
                        setOnModify(!onModify); 
                         return toggleCommentModal('Le commentaire ne doit comporter que des lettres');
                    }
                }
                const newComment = newCommentArr.join('<br />');

                if(newTextComment !== comment.join('\n')) {
                    console.log("CPAREILLOL");
                    handleComment("modify", newComment);
                }
            }
        }
        setOnModify(!onModify); 
    };

    /**
     * CONTROL MODIFY COMMENT INPUT
     * @param {*} value 
     */
    const handleTextArea = (value) => {
        setNewTextComment(value);
    };

    /**
     * TOGGLE DELETE MODAL
     */
    const toggleModalDelete = () => {
        setModalDeleteVisible(!modalDeleteVisible);
    };

    /**
     * TOGGLE COMMENT MODAL
     * @param {*} message 
     */
    const toggleCommentModal = (message) => {
        if(message) {
            setModalMsg(message);
        }
        setModalComment(!modalComment);
    };

    return (
        <>
        <div className='comment'>
            {
                onModify ?
                <textarea onChange={(e) => handleTextArea(e.target.value)} value={newTextComment} className='comment__textArea'></textarea>
                :
                <> {
                    comment.map(el => <p>{el}</p>)
                    }
                </>  
            }
            <div className="comment__separator"></div>
            <div className="comment__bot">
                <div className="comment__bot__infos">
                    <p className="comment__bot__infos__date">{ commentTS.created === commentTS.updated ?
                    <>
                     Ajouté le {commentDate.created }
                    </>
                     :
                     <>
                      Modifié le {commentDate.updated }
                     </>
                      }</p>
                    <p className="comment__bot__infos__date">{ commentTS.created === commentTS.updated ? "À " + commentTime.created : "À " + commentTime.updated }</p>
                    <p className='comment__bot__infos__name'>{ (userName.firstName === null || userName.lastName === null) ? "Par Anonyme" : "Par " + userName.firstName + " " + userName.lastName + "." }</p>
                </div>
                {
                    props.userId === props.actualUserId &&
                    <div className="comment__bot__btnCont">
                        <button onClick={openModify} className='comment__bot__btnCont__btn'>Modifier</button>
                        <button onClick={toggleModalDelete} className='comment__bot__btnCont__btn'>Supprimer</button>
                    </div>
                }
            </div>

        </div>
        {
            modalDeleteVisible &&
            <div className="comment__deleteConfirm">
                <div className="comment__deleteConfirm__modal">
                    <h2>Supprimer ce commentaire ?</h2>
                    <div className="comment__deleteConfirm__modal__btnCont">
                        <button onClick={toggleModalDelete}>non</button>
                        <button onClick={() => handleComment("delete")}>oui</button>
                    </div>
                </div>
            </div>
        }
        {
            modalComment &&
            <div className="comment__handleModal">
                <div className="comment__handleModal__modal">
                    <h2>{modalMsg}</h2>
                    <div><button onClick={toggleCommentModal}>Ok</button></div>
                </div>
            </div>
        }
        </>

    );
};

export default Comment;