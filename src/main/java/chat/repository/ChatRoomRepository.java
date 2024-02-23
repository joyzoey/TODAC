package chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.ChatListInterface;
import chat.data.ChatRoomDto;

public interface ChatRoomRepository extends JpaRepository<ChatRoomDto, Short> {
	@Query(value = 
			"""
			SELECT 
			    r.chatroomcode, 
			    s.publisheddate AS date, 
			    c.name AS counselorname,  
			    CONCAT('https://kr.object.ncloudstorage.com/guest-hch/TODAC/counselors/', c.photo) AS counselorphoto,
			    d.diagnosiscode as diagnosiscode
			FROM 
			    chatroom r
			LEFT JOIN 
			    counselor c ON r.counselorcode = c.counselorcode
			LEFT JOIN 
			    chatsummary s ON r.chatroomcode = s.chatroomcode
			LEFT JOIN 
			    chatdiagnosis d ON r.chatroomcode = d.chatroomcode
			where r.usercode = :usercode
			
			""", nativeQuery = true)
	public List<ChatListInterface> getChatroomsOfMember(@Param("usercode") int usercode);
	
	@Query(value = "select name from counselor natural join chatroom where chatroomcode = :chatroomcode"
			, nativeQuery = true)
	public String getCounselorNameInRoom(@Param("chatroomcode") Short chatroomcode);
	
	@Query(value = "select photo from member natural join chatroom where chatroomcode = :chatroomcode"
			, nativeQuery = true)
	public String getMemberPhotoInRoom(@Param("chatroomcode") Short chatroomcode);
	
	@Query(value = "select usercode from member natural join chatroom where chatroomcode = :chatroomcode"
			, nativeQuery = true)
	public String getMemberUsercodeInRoom(@Param("chatroomcode") Short chatroomcode);
	
}
