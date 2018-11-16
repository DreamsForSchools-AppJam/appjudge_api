import React from 'react';

const JudgesList = (props) => {
    return (
        <div>
            {
            props.judges.map((judge) => {
                return (
                    <h4
                        key={judge.id}
                        className="box title is-4"
                        >{ judge.username }
                    </h4>
                    )
                })
            }
        </div>
    )
};

export default JudgesList;