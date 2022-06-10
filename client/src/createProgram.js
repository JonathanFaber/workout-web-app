import { React, useState } from 'react'
import './createProgram.css'

const CreateProgram = () => {
  const [program, setProgram] = useState([{ 
    name: 'Block 1', 
    weeks: [{ days: [{ exercises: [], nextExerciseName: '' }] }] 
  }])
  
  /* Get Data from backend
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  const handleNameBlock = (e, i) => {
    const newProgram = program.slice()
    newProgram[i].name = e.target.value
    setProgram(newProgram)
  }

  const handleAddBlock = () => {
    if (program.length < 32) {
      const newProgram = program.slice()
      newProgram.push({ 
        name: `Block ${program.length + 1}`, 
        weeks: [{ days: [{ exercises: [], nextExerciseName: '' }] }] 
      })
      setProgram(newProgram)
    }
  }

  const handleAddBlockCopy = (i) => {
    if (program.length < 32) {
      const newProgram = program.slice()
      const weeks = program[i].weeks
      newProgram.push({ 
        name: `Block ${program.length + 1}`,
        weeks: JSON.parse(JSON.stringify(weeks)) 
      })
      setProgram(newProgram)
    }
  }

  const handleRemoveBlock = (i) => {
    if (program.length > 1) {
      const newProgram = program.slice()
      newProgram.splice(i, 1)
      setProgram(newProgram)
    }
  }

  const handleAddWeek = (i) => {
    if (program[i].weeks.length < 52) {
      const newProgram = program.slice()
      newProgram[i].weeks.push({ days: [{ exercises: [], nextExerciseName: '' }] })
      setProgram(newProgram)
    }
  }

  const handleAddWeekCopy = (i, j) => {
    if (program[i].weeks.length < 52) {
      const newProgram = program.slice()
      const days = program[i].weeks[j].days
      newProgram[i].weeks.push({ days: JSON.parse(JSON.stringify(days)) })
      setProgram(newProgram)
    }
  }

  const handleRemoveWeek = (i, j) => {
    if (program[i].weeks.length > 1) {
      const newProgram = program.slice()
      newProgram[i].weeks.splice(j, 1)
      setProgram(newProgram)
    }
  }

  const handleAddDay = (i, j) => {
    if (program[i].weeks[j].days.length < 32) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days.push({ exercises: [], nextExerciseName: '' })
      setProgram(newProgram)
    }
  }

  const handleAddDayCopy = (i, j, k) => {
    if (program[i].weeks[j].days.length < 32) {
      const newProgram = program.slice()
      const exercises = program[i].weeks[j].days[k].exercises
      newProgram[i].weeks[j].days.push({ 
        exercises: JSON.parse(JSON.stringify(exercises)), 
        nextExerciseName: '' })
      setProgram(newProgram)
    }
  }

  const handleRemoveDay = (i, j, k) => {
    if (program[i].weeks[j].days.length > 1) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days.splice(k, 1)
      setProgram(newProgram)
    }
  }

  const handleNameNewExercise = (e, i, j, k) => {
    const newProgram = program.slice()
    newProgram[i].weeks[j].days[k].nextExerciseName = e.target.value
    setProgram(newProgram)
  }

  const handleNameExercise = (e, i, j, k, l) => {
    const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].name = e.target.value
      setProgram(newProgram)
  }

  const handleAddExercise = (i, j, k) => {
    if (program[i].weeks[j].days[k].exercises.length < 32) {
      const name = program[i].weeks[j].days[k].nextExerciseName
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises.push({ name, sets: [], nextReps: 1 })
      newProgram[i].weeks[j].days[k].nextExerciseName = ''
      setProgram(newProgram)
    }
  }

  const handleRemoveExercise = (i, j, k, l) => {
    if (program[i].weeks[j].days[k].exercises.length > 0) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises.splice(l, 1)
      setProgram(newProgram)
    }
  }

  const handleNewSetReps = (e, i, j, k, l) => {
    const newProgram = program.slice()
    newProgram[i].weeks[j].days[k].exercises[l].nextReps = e.target.value
    setProgram(newProgram)
  }

  const handleAddSet = (i, j, k, l) => {
    if (program[i].weeks[j].days[k].exercises[l].sets.length < 32) {
      const reps = program[i].weeks[j].days[k].exercises[l].nextReps
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].sets.push(reps)
      setProgram(newProgram)
    }
  }

  const handleChangeSet = (e, i, j, k, l, m) => {
    const newProgram = program.slice()
    newProgram[i].weeks[j].days[k].exercises[l].sets[m] = e.target.value
    setProgram(newProgram)
  }

  const handleRemoveSet = (i, j, k, l, m) => {
    if (program[i].weeks[j].days[k].exercises[l].sets.length > 0) {
      const newProgram = program.slice()
      newProgram[i].weeks[j].days[k].exercises[l].sets.splice(m, 1)
      setProgram(newProgram)
    }
  }

  return (
    <form>
      {/*data && <>{data}</>*/}
      <label className='form-label' htmlFor='program-name'>Program name</label>
      <input type='text' className='form-control form-control-lg' name='program-name'></input>

      <div>
        <button type='button' className='btn btn-primary' onClick={handleAddBlock}>Add new block</button>
      </div>

      <ul>
        {program.map((block, i) => <li key={`block-${i}`}>
          <div class='input-group' role='group'>
            <input className='form-control' defaultValue={`Block ${i + 1}`} value={block.name} onInput={(e) => handleNameBlock(e, i)}></input>
            <button type='button' className='btn btn-primary' onClick={() => handleAddBlockCopy(i)}>Add copy</button>
            {program.length > 1 && 
              <button type='button' className='btn btn-primary' onClick={() => handleRemoveBlock(i)}>Remove block</button>}
          </div>

          <div>
            <button type='button' className='btn btn-primary' onClick={() => handleAddWeek(i)}>Add new week</button>
          </div>

          <ul>
            {block.weeks.map((week, j) => <li key={`week-${i}-${j}`}> 
              <span className='text'>Week {j + 1} </span>

              <div class='btn-group' role='group'>
                <button type='button' className='btn btn-primary' onClick={() => handleAddWeekCopy(i, j)}>Add copy</button>
                {block.weeks.length > 1 && 
                  <button type='button' className='btn btn-primary' onClick={() => handleRemoveWeek(i, j)}>Remove week</button>}
              </div>

              <div>
                <button type='button' className='btn btn-primary' onClick={() => handleAddDay(i, j)}>Add new day</button>
              </div>

              <ul>
                {week.days.map((day, k) => <li key={`day-${i}-${j}-${k}`}>
                  <span className='text'>Day {k + 1} </span>

                  <div class='btn-group' role='group'>
                    <button type='button' className='btn btn-primary' onClick={() => handleAddDayCopy(i, j, k)}>Add copy</button>
                    {week.days.length > 1 &&
                      <button type='button' className='btn btn-primary' onClick={() => handleRemoveDay(i, j, k)}>Remove day</button>}
                  </div>

                  <div className='input-group'>
                    <input className='form-control' value={day.nextExerciseName} onInput={(e) => handleNameNewExercise(e, i, j, k)}></input>
                    <button type='button' className='btn btn-primary' onClick={() => handleAddExercise(i, j, k)}>Add new exercise</button>
                  </div>

                  <ul>
                    {day.exercises.map((exercise, l) => <li key={`exercise-${i}-${j}-${k}-${l}`}>
                      <div className='input-group'>
                        <input className='form-control' value={exercise.name} onInput={(e) => handleNameExercise(e, i, j, k, l)}></input>
                        <button type='button' className='btn btn-primary' onClick={() => handleRemoveExercise(i, j, k, l)}>Remove exercise</button>
                      </div>

                      <div className='input-group'>
                        <input type='number' className='form-control' min='0' value={exercise.nextReps} onChange={(e) => handleNewSetReps(e, i, j, k, l)}></input>
                        <span className='input-group-text'>reps</span>
                        <button type='button' className='btn btn-primary' onClick={() => handleAddSet(i, j, k, l)}>Add set</button>
                      </div>

                      <ul>
                        {exercise.sets.map((set, m) => <li key={`set-${i}-${j}-${k}-${l}-${m}`}>
                          <div className='input-group'>
                            <span className='input-group-text'>Set {m + 1}: </span>
                            <input type='number' className='form-control' min='0' value={set} onInput={(e) => handleChangeSet(e, i, j, k, l, m)}></input>
                            <span className='input-group-text'>reps</span>
                            <button type='button' className='btn btn-primary' onClick={() => handleRemoveSet(i, j, k, l, m)}>Remove set</button>
                          </div>
                        </li>)}
                      </ul>
                    </li>)}
                  </ul>
                </li>)}
              </ul>
            </li>)}
          </ul>
        </li>)}
      </ul>

      <div>
        <button type="submit" className='btn btn-primary'>Save Program</button>
      </div>
    </form>
  )
}

export default CreateProgram