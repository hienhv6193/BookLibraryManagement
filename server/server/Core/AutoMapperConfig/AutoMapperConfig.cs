using AutoMapper;
using server.Core.Dtos.Book;
using server.Core.Models.Book;

namespace server.Core.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() 
        {
            // Book
            CreateMap<BookModel, BookGetDto>()
                .ForMember(typeBook => typeBook.typeBookName,
                opt => opt.MapFrom(src => src.typeBook.name));
        }
    }
}
