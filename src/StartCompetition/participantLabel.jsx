
import './StartCompetition.css'

function ParticipantLabel({participant}) {
    
   

    return (   
        <div className="Participant" >
            <label className='ParticipantLabel'>{participant.name}</label>
        </div>
    )
}
export default ParticipantLabel