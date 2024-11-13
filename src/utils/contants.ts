export const CONSTANTS={
    msgValidation:{
        groupId:"groupId must be non-empty string",
        facilityId:"faciltityId must be non-empty string",
        bookingDate:"bookingDate must be non-empty string",
        duplicateGroupName:'A group with same name already exists',
        adminCanOnlyDelete:'Only admins can delete group',
        invalidRequest:'Invalid request',
        notInvited:'Not invited to this group',
        adminsOnlyCanRemove:'Admins only can remove group members',
        adminsCanSendReq:'Only admins can send request',
        makeOtherAdmin:'Please make someone admin before leaving',
        doesNotBelongToGroup:'Not a part of group',
        cantDoAdminOps:'Cant perform admin operations as you are not admin',
        alreadyInGroup:'User already in group.'
    },
    dtoFields:{
        CreateBookingDto:["groupId","facilityId","bookingDate"]
    },
    errorCodes:{
        11000:(key)=>{return `Field ${key} already exists`}
    },
    redisKeys:{
        userInvitation:(uuid)=>{return `${uuid}_groupInvites`},
        adminOfGroup:(uuid)=>{return `${uuid}_admin`}
    },
    axiosURLs:{
        getFacInfo:(facilityId)=>{return `http://localhost:3001/facility/facilityInfo?id=${facilityId}`},
        getGroupInfo:(groupId)=>{return `http://localhost:3003/group/getGroupInfo?id=${groupId}`}
    }
}