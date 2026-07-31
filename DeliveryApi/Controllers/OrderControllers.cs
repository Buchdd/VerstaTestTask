using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeliveryApi.Models; // Твой сгенерированный DbContext и модели

namespace DeliveryApi.Controllers;

// DTO для удобного приема JSON с фронтенда
public class CreateOrderDto
{
    public AddressDto Sender { get; set; } = null!;
    public AddressDto Recipient { get; set; } = null!;
    public CargoDto Cargo { get; set; } = null!;
    public DateOnly DatePickup { get; set; }
}

public class AddressDto
{
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string House { get; set; } = string.Empty;
    public string? Apartment { get; set; }
}

public class CargoDto
{
    public int Weight { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly VertaDbContext _context;

    public OrdersController(VertaDbContext context)
    {
        _context = context;
    }

    // 1. Чтение всех заказов для списка
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.IdSenderAddressNavigation)   // Подгружаем адрес отправителя
            .Include(o => o.IdRecipientAddressNavigation) // Подгружаем адрес получателя
            .Include(o => o.IdCargoNavigation)            // Подгружаем груз
            .ToListAsync();

        return Ok(orders);
    }

    // 2. Чтение 1 заказа по ID в режиме просмотра
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(ulong id)
    {
        var order = await _context.Orders
            .Include(o => o.IdSenderAddressNavigation)
            .Include(o => o.IdRecipientAddressNavigation)
            .Include(o => o.IdCargoNavigation)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound(new { message = "Заказ не найден" });

        return Ok(order);
    }

    // 3. Создание заказа
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var sender = new Address { City = dto.Sender.City, Street = dto.Sender.Street, House = dto.Sender.House, Apartment = dto.Sender.Apartment };
        var recipient = new Address { City = dto.Recipient.City, Street = dto.Recipient.Street, House = dto.Recipient.House, Apartment = dto.Recipient.Apartment };
        var cargo = new Cargo { Weight = dto.Cargo.Weight };

        _context.Addresses.Add(sender);
        _context.Addresses.Add(recipient);
        _context.Cargos.Add(cargo);

        await _context.SaveChangesAsync(); // Сохраняем, чтобы получить их ID

        var order = new Order
        {
            IdSenderAddress = sender.Id,
            IdRecipientAddress = recipient.Id,
            IdCargo = cargo.Id,
            DatePickup = dto.DatePickup
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }
}