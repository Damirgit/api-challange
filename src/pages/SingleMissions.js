import React, { useEffect, useState } from 'react'
import {
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardBody,
  MDBCard,
  MDBBtn
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';
import './SingleMission.css'

export default function SingleMissions({ item }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments') || '[]'))

  const postComment = () => {
    if (comment.length === 0)
      return

    setComments([...comments, { id: new Date().getTime(), itemId: item.mission_name, comment }])
    setComment('')
  }

  useEffect(() => {
    if (comments.length > 0)
      localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])

  if (!item)
    return null

  return (
    <div>
      <MDBBtn onClick={() => navigate('/')}>Back</MDBBtn>
      <MDBCard
        style={{ maxWidth: "22rem", maxHeight: "24rem" }}
      >
        <MDBCardImage
          src={
            item && item.ships[0] && item.ships[0].image
              ? item.ships[0].image
              : "https://i.imgur.com/MtEgYbY.jpg"
          }
          position="top"
          alt={item.mission_name}
        />
        <MDBCardBody>
          <MDBCardTitle>{item.mission_name}</MDBCardTitle>
          <MDBCardText>{item.launch_site.site_name_long}</MDBCardText>
        </MDBCardBody>
      </MDBCard>

      <div className='comments'>
        <h2>Comments</h2>

        {comments.filter(comment => comment.itemId === item.mission_name)
          .map(item => <div className='comment' key={item.id}>
            {item.comment}
            <br />
            <small>{new Date(item.id).toString().slice(0, 21)}</small>
          </div>)}
        <textarea value={comment} onChange={(e) => setComment(e.currentTarget.value)}></textarea>
        <MDBBtn onClick={() => postComment()}>Comment</MDBBtn>
      </div>
    </div>
  )
}
