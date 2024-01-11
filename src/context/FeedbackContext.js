import { createContext, useState } from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, ] = useState(true)
    const [feedback, setFeedback] = useState([
        {
            "text": "Hello, ReactJS",
            "rating": 10,
            "id": 1
        },
        {
            "text": "Hello, there",
            "rating": 7,
            "id": 2
        }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    //Once application opens, fetchFeedback load by useEffect
    // useEffect(() => {
    //     fetchFeedback()
    // }, [])

    // //Fetch Feedback
    // const fetchFeedback = async () => {
    //     const response = await fetch('http://localhost:5000/feedback')
    //     const data = await response.json()
    //     setFeedback(data)
    //     setIsLoading(false)
    // }

    //Add feedback
    const addFeedback = async (newFeedback) => {
        // const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`, 
        //     {
        //         method: 'POST',
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(newFeedback),
        //     })
        // const data = await response.json()
        setFeedback([newFeedback, ...feedback])
    }

    //Delete Feedback
    const deleteFeedback = async (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
            // await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE'})
        setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }

    //Update Feedback
    const updateFeedback = async (id, upItem) => {
        // const response = await fetch(`http://localhost:5000/feedback/${id}`, {
        //     method: 'PUT',
        //     header: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify(upItem)
        // })
        // const upItem = await response.json()
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...upItem } : item ))
    } 

    //Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Functions and variables pass down to providers
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback
    }}>
        { children }
    </FeedbackContext.Provider>
}

export default FeedbackContext