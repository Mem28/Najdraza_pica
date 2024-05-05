using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PicaController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PicaController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pice>>> Get()
        {
            try
            {
                var pica = await _context.Pica.ToListAsync();
                return Ok(pica);
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pice>> GetPice(int id)
        {
            try
            {
                var pice = await _context.Pica.FirstOrDefaultAsync(p => p.Id == id);
                return Ok(pice);

            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                           ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Pice>> Insert(InsertDto insertDto)
        {
            try
            {
                var pice = new Pice
                {
                    Naziv = insertDto.Naziv,
                    Ocjena = insertDto.Ocjena,
                    Sastojci = insertDto.Sastojci
                };

                _context.Pica.Add(pice);
                await _context.SaveChangesAsync();

                return Ok(pice);

            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                            ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, UpdateDto updateDto)
        {
            try
            {
                if (id == 0 || updateDto == null)
                {
                    return BadRequest(ModelState);
                }

                var pice = await _context.Pica.FirstOrDefaultAsync(p => p.Id == id);

                if(pice == null) return NotFound();

                _mapper.Map(updateDto, pice);

                _context.Pica.Update(pice);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                          ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var pice = await _context.Pica.FindAsync(id);
                if(pice != null)
                {
                    _context.Pica.Remove(pice);
                    await _context.SaveChangesAsync();
                    return Ok();

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
            }
        }
    }
}
