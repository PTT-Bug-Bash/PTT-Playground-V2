import OpportunityItem from "./OpportunityItem"

function OpportunityList(props) {
  const { data, userType, entityID, handleOpenEdit, handleOpenExpand , handleDelete, matches, brands} = props;

  console.log("Data received in OpportunityList:", data);

  if (!data || data.length === 0) {
    return <p>No Opportunity data given</ p>
}
    
  return (
    <div className="feedback-list">
        {data.map((item) => (
            <OpportunityItem 
              key={item.id} 
              item={item} 
              userType={userType} 
              entityID={entityID}
              handleOpenEdit={handleOpenEdit}
              handleOpenExpand={handleOpenExpand}
              handleDelete={handleDelete}
              matches={matches}
              brands={brands}
            />
        ))
        }
    </div>
  )
}

export default OpportunityList