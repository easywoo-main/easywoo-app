// import React, { useState } from "react";
//
// interface AddAnswerModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSubmit: (nodeId: string, answer: string) => void;
// }
//
// const NewAnswerModal: React.FC<AddAnswerModalProps> = ({
//                                                            isOpen,
//                                                            onClose,
//                                                            onSubmit,
//                                                        }) => {
//     const [answer, setAnswer] = useState<string>("");
//
//     const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setAnswer(e.target.value);
//     };
//
//     const handleSubmit = () => {
//         if (answer.trim() !== "") {
//             onSubmit("root", answer);
//             setAnswer("");
//             onClose();
//         } else {
//             alert("Відповідь не може бути порожньою");
//         }
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Додати нову відповідь</h2>
//                 <textarea
//                     value={answer}
//                     onChange={handleAnswerChange}
//                     placeholder="Введіть вашу відповідь"
//                     rows={4}
//                     className="textarea"
//                 />
//                 <div className="modal-actions">
//                     <button onClick={onClose}>Закрити</button>
//                     <button onClick={handleSubmit}>Додати відповідь</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default NewAnswerModal;
