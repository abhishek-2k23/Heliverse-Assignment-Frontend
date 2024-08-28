import React from 'react'

const ShowTeamMembers = ({teamUsers}) => {
  return (
    <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Members:{` ${teamUsers?.length}`}
          </h3>
          <ul>
            {teamUsers?.map((user) => (
              <li key={user?.id} className="border-b border-gray-900 py-2">
                <p>
                  <strong>Name:</strong>{" "}
                  {`${user?.first_name} ${user?.last_name} `}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Domain:</strong> {user?.domain}
                </p>
                <p>
                  <strong>Gender:</strong> {user?.gender}
                </p>
              </li>
            ))}
          </ul>
        </div>
  )
}

export default ShowTeamMembers